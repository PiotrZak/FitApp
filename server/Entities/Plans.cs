using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using WebApi.Controllers.ViewModels;

namespace WebApi.Entities
{
    public class Plan
    {
        public Plan()
        {
            PlanId = Guid.NewGuid().ToString();
            Exercises = new List<Exercise>();
            ClientsPlans = new List<ClientsPlans>();
        }

        [Key]
        public string PlanId { get; set; }
        public string Title { get; set; }
        public string CreatorId { get; set; }
        public string CreatorName { get; set; }

        public List<Exercise> Exercises { get; set; }

        public virtual ICollection<ClientsPlans> ClientsPlans { get; set; }

        //public List<AssignPlansToUser> UserIds{ get; set; }
        //public List<Trainer> Trainers { get; set; }
    }
}