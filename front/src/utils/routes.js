// eslint-disable-next-line import/prefer-default-export

const accountRoutes = {
  register: '/register',
  forgotPassword: '/forgot',
  activate: '/account/activate:verificationToken',
  resetPassword: '/account/reset:resetToken',
  login: '/login',
  confirmation: '/confirmation'
}

const categoriesRoutes = {
  categories: '/categories',
  category: '/category/:id',
}

export const routes = {


  register: accountRoutes.register,
  forgotPassword: accountRoutes.forgotPassword,
  activate: accountRoutes.activate,
  resetPassword: accountRoutes.resetPassword,
  login: accountRoutes.login,
  confirmation: accountRoutes.confirmation,


  //todo expired
  linkExpired: '/expired',
  //currently
  categories: categoriesRoutes.categories,
  category: categoriesRoutes.category,
  addExcersise: '/add-exercise',
  editExcersise: '/edit-exercise',
  exercise: '/exercise',


  privacy: '/privacy',

  plans: '/plans',
  plan: '/plan',
  users: '/users',
  user: '/user',
  organizations: '/organizations',
  organizationUsers: '/organizationusers',
  organizationTrainer: '/organizationclients',
  organizationClients: '/organizationclients',
  trainers: '/trainers',
  clients: '/clients',
  myProfile: '/myprofile',
};
