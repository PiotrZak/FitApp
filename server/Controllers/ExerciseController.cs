using Microsoft.AspNetCore.Mvc;
using WebApi.Services;
using WebApi.Entities;
using WebApi.Helpers;
using Microsoft.Extensions.Options;
using Microsoft.AspNetCore.Authorization;
using AutoMapper;
using WebApi.Models;
using System.IO;

namespace WebApi.Controllers
{
    [Authorize]
    [ApiController]
    [Route("[controller]")]
    public class ExercisesController : ControllerBase
    {
        private IExerciseService _ExerciseService;
        private IMapper _mapper;
        private readonly AppSettings _appSettings;

        public ExercisesController(
            IExerciseService ExerciseService,
            IMapper mapper,
            IOptions<AppSettings> appSettings)
        {
            _ExerciseService = ExerciseService;
            _mapper = mapper;
            _appSettings = appSettings.Value;
        }

        [AllowAnonymous]
        [HttpPost("create")]
        public ActionResult<Exercise> CreateExercise([FromForm] CreateExercise model)
        {
            
            //transform IFormFile to byte[]
            using var memoryStream = new MemoryStream();
            model.File.CopyTo(memoryStream);

            var model2 = new ExerciseModel
            {
                Name = model.Name,
                Description = model.Description,
                Times = model.Times,
                Series = model.Series,
                File = memoryStream.ToArray()
            };

            var Exercise = _mapper.Map<Exercise>(model2);

            try
            {
                // create Exercise
                _ExerciseService.Create(Exercise);
                return Ok();
            }
            catch (AppException ex)
            {
                // return error message if there was an cexception
                return BadRequest(new { message = ex.Message });
            }
        }

        [AllowAnonymous]
        [HttpGet("{id}")]
        public IActionResult GetById(string id)
        {
            var exercise = _ExerciseService.GetById(id);

            if (exercise == null)
                return NotFound();

            return Ok(exercise);
        }

        [AllowAnonymous]
        [HttpGet]
        public IActionResult GetAll()
        {
            var exercises = _ExerciseService.GetAll();
            return Ok(exercises);
        }

        [AllowAnonymous]
        [HttpDelete("{id}")]
        public IActionResult Delete(string id)
        {
            _ExerciseService.Delete(id);
            return Ok();
        }
    }
}
