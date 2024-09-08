using Domain.Data.Models.DbModels;
using PostSharp.Aspects;
using PostSharp.Serialization;

namespace InstagramWorker.Aspects
{
    [PSerializable]
    public class LogMethodAspect : OnMethodBoundaryAspect
    {
        public override void OnEntry(MethodExecutionArgs args)
        {
            var context = DbContextProvider.DbContext;
            context.Add(new InstagramLog
            {
                OccurredAt = DateTime.Now,
                Operation = "Beginning of reseting user values",
                UserName = "Worker service"
            });
            context.SaveChanges();
        }

        public override void OnExit(MethodExecutionArgs args)
        {
            var context = DbContextProvider.DbContext;
            context.Add(new InstagramLog
            {
                OccurredAt = DateTime.Now,
                Operation = "Ending of reseting user values",
                UserName = "Worker service"
            });
            context.SaveChanges();
        }

        public override void OnException(MethodExecutionArgs args)
        {
            var context = DbContextProvider.DbContext;
            context.Add(new InstagramLog
            {
                OccurredAt = DateTime.Now,
                Operation = "Error of reseting user values",
                UserName = "Worker service"
            });
            context.SaveChanges();
        }
    }
}
