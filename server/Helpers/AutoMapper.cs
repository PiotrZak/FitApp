using AutoMapper;
using WebApi.Controllers.ViewModels;
using WebApi.Data.Entities;
using WebApi.Data.Entities.Users;
using WebApi.Entities;
using WebApi.Models;

namespace WebApi.Helpers
{
    public class AutoMapperProfile : Profile
    {
        public AutoMapperProfile()
        {

            CreateMap<CreateOrganization, Organization>();

            CreateMap<ActivateAccount, User>();
            CreateMap<ActivateAccount, Client>();
            
            CreateMap<RegisterModel, User>();
            CreateMap<RegisterModel, Client>();
            CreateMap<AuthenticateModel, User>();
            CreateMap<UpdateUserModel, User>();

            CreateMap<Client, TrainerClient>();
            CreateMap<Trainer, TrainerClient>();
            CreateMap<User, Trainer>();
            CreateMap<User, Client>();
            CreateMap<Trainer, UserViewModel>();

            CreateMap<CreateCategory, Category>();

            CreateMap<CreatePlan, Plan>();
            CreateMap<Plan, ResultPlan>();

            CreateMap<CreateExercise, Exercise>();
            CreateMap<UpdateExerciseModel, Exercise>();
            CreateMap<ExerciseModel, Exercise>();
        }
    }
}