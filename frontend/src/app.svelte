<script lang="ts" >
  import Router, { push } from 'svelte-spa-router';
  import { wrap } from 'svelte-spa-router/wrap'

  // Components
  import Home from './pages/home/home.svelte';
  import Navigation from './components/navigation.svelte';
  import Layout from './components/layout.svelte';
  import Login from './pages/login/login.svelte';
  import NotFound from './pages/not-found/not-found.svelte';
  import SignUp from './pages/sign-up/sign-up.svelte';
  import Users from './pages/users/users.svelte';
  import UsersManagement from './api';
  import { currentUser, isUserLoggedIn } from './store';
  import { onMount } from 'svelte';

  let loggedIn: boolean;

	isUserLoggedIn.subscribe((value: boolean) => {
		loggedIn = value;
	});

  const redirect = () => {
    if (loggedIn) {
      push('/users/')
    } else {
      return true
    }
  }

  onMount(() => {
    const jwt = UsersManagement.JWT;
    const accessToken = localStorage.getItem('JWT-accessToken');
    const parsedJwt = jwt.parseJwt(accessToken)
  
    if (parsedJwt?.exp >= (new Date().getTime() + 1) / 1000) {
      isUserLoggedIn.set(true)
    } else {
      isUserLoggedIn.set(false)
    }

    currentUser.set({
      id: parsedJwt?.id,
      firstName: parsedJwt?.firstName,
      lastName: parsedJwt?.lastName,
    })
  })

  // routes
  const routes = new Map()
  routes.set('/', Home)
  routes.set('/login/', wrap({
    component: Login,
    conditions: [redirect]
  }))
  routes.set('/signup/', wrap({
    component: SignUp,
    conditions: [redirect]
  }))
  routes.set('/users/', wrap({
    component: Users,
    conditions: [
      () => {
        if (loggedIn) {
          return true
        } else {
          push('/')
        }
      }
    ]
  }))
  routes.set('*', NotFound)

</script>

<Navigation />
<Layout>
  <Router {routes}/>
</Layout>