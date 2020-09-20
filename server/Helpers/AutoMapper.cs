using AutoMapper;
using WebApi.Controllers.ViewModels;
using WebApi.Entities;
using WebApi.Models;

namespace WebApi.Helpers
{
    public class AutoMapperProfile : Profile
    {
        public AutoMapperProfile()
        {
            CreateMap<RegisterModel, User>();
            CreateMap<UpdateUserModel, User>();

            CreateMap<UpdateUserModel, User>();

            CreateMap<Client, TrainerClient>();

            CreateMap<CreateCategory, Category>();

            CreateMap<CreateExercise, Exercise>();
            CreateMap<UpdateExerciseModel, Exercise>();
            CreateMap<ExerciseModel, Exercise>();
        }
    }
}