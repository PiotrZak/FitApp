using Microsoft.AspNetCore.Mvc;
using WebApi.Services;
using WebApi.Entities;
using WebApi.Helpers;
using Microsoft.Extensions.Options;
using Microsoft.AspNetCore.Authorization;
using AutoMapper;
using WebApi.Models;

namespace WebApi.Controllers
{
    [Authorize]
    [ApiController]
    [Route("[controller]")]
    public class PlansController : ControllerBase
    {
        private IPlanService _planService;
        private IMapper _mapper;
        private readonly AppSettings _appSettings;
       
        public PlansController(
            IPlanService planService,
            IMapper mapper,
            IOptions<AppSettings> appSettings)
        {
            _planService = planService;
            _mapper = mapper;
            _appSettings = appSettings.Value;
        }

        [AllowAnonymous]
        [HttpPost("create")]
        public IActionResult Create([FromBody]CreatePlan model)
        {

            var plan = _mapper.Map<Plan>(model);

            try
            {
                _planService.Create(plan);
                return Ok(new
                {
                    plan.PlanId,
                    plan.Title,
                    plan.CreatorId,
                    plan.CreatorName,
                });
            }
            catch (AppException ex)
            {
                return BadRequest(new { message = ex.Message });
            }
        }

        [AllowAnonymous]
        [HttpGet("{id}")]
        public IActionResult GetById(string id)
        {
            var plan = _planService.GetById(id);

            if (plan == null)
                return NotFound();

            return Ok(plan);
        }

        [AllowAnonymous]
        [HttpPost("assignExercises")]
        public IActionResult AssignToPlan([FromBody]AssignExerciseToPlan model)
        {
            _planService.AssignExercisesToPlan(model.PlanId, model.ExerciseId);

            return Ok();
        }

        [AllowAnonymous]
        [HttpPost("unassignExercises")]
        public IActionResult UnassignToPlan([FromBody] AssignExerciseToPlan model)
        {
            _planService.UnassignExercisesToPlan(model.PlanId, model.ExerciseId);

            return Ok();
        }


        [AllowAnonymous]
        [HttpGet]
        public IActionResult GetAll()
        {
            var plans = _planService.GetAll();
            return Ok(plans);
        }

        [AllowAnonymous]
        [HttpPost("delete")]
        public IActionResult Delete([FromBody] string[] id)
        {
            _planService.Delete(id);
            return Ok();
        }

    }
}
