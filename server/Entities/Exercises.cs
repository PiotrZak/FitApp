using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using HotChocolate;

namespace WebApi.Entities
{
    public class Exercise
    {
        public Exercise()
        {
            ExerciseId = Guid.NewGuid().ToString();
            Files = new List<byte[]>();
        }

        [Key]
        public string ExerciseId { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public int Times { get; set; }
        public int Series { get; set; }
        public int Weight { get; set; }
        [GraphQLIgnore]
        public List<byte[]> Files { get; set; }
        public string CategoryId { get; set; }
        public string PlanId { get; set; }
    }
}