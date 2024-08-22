using InstagramCopy.Services.UserServices.PictureEntity.Commands;
using InstagramCopy.Services.UserServices.PictureEntity.Dtos;
using InstagramCopy.Services.UserServices.PictureEntity.Filters;
using InstagramCopy.Services.UserServices.PictureEntity.Queries;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace InstagramCopy.Controllers
{
    public class PictureController : BaseController
    {
        [HttpGet]
        public async Task<ActionResult<IList<PictureDto>>> Get([FromQuery] PictureFilter filter)
        {
            var result = await Mediator.Send(new GetFilteredPicturesQuery(filter));
            return Ok(result);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<PictureDetailDto?>> GetById(Guid id)
        {
            var result = await Mediator.Send(new GetPictureQuery(id));
            return result is not null ? Ok(result) : NotFound();
        }

        [HttpPost]
        [Authorize(Roles = "User, Administrator")]
        public async Task<ActionResult> Create([FromBody] CreatePictureCommand command)
        {
            var user = User.Identity.Name;
            command.AuthorName = user;
            var result = await Mediator.Send(command);
            return Ok(result);
        }

        [HttpPut("{id}")]
        [Authorize(Roles = "User, Administrator")]
        public async Task<ActionResult> Update([FromBody] UpdatePictureCommand command, Guid id)
        {
            command.Id = id;
            var result = await Mediator.Send(command);
            return Ok(result);
        }

        [HttpDelete("{id}")]
        [Authorize(Roles = "User, Administrator")]
        public async Task<ActionResult<bool>> Delete(Guid id)
        {
            var result = await Mediator.Send(new DeletePictureCommand(id));
            return Ok(result);
        }
    }
}
