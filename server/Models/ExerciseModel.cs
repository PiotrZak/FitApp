﻿using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using WebApi.Entities;

namespace WebApi.Models
{
    public class ExerciseModel
    {
        [Key]
        public string Name { get; set; }
        public string Description { get; set; }
        public int Times { get; set; }
        public int Series { get; set; }
        public int Weight { get; set; }
        public List<byte[]> Files { get; set; }
        public string CategoryId { get; internal set; }
    }
}
