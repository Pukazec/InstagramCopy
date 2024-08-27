using Domain.Data.Filters;
using Microsoft.AspNetCore.Mvc;
using Services.Services.UserServices.InstgramLogEntity.Dtos;
using Services.Services.UserServices.InstgramLogEntity.Queries;

namespace InstagramCopy.Controllers
{
    public class InstagramLogController : BaseController
    {
        [HttpGet]
        public async Task<ActionResult<IList<InstagramLogDto>>> Get([FromQuery] InstagramLogFilter filter)
        {
            var result = await Mediator.Send(new GetFilteredInstagramLogQuery(filter));
            return Ok(result);
        }
    }
}
