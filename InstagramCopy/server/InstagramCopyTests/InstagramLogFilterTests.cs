using Domain.Data.Filters;
using Domain.Data.Models.DbModels;
using Xunit;

namespace InstagramCopyTests
{
    public class InstagramLogFilterTests
    {
        private readonly IQueryable<InstagramLog> _testLogs;

        public InstagramLogFilterTests()
        {
            _testLogs = new List<InstagramLog>
            {
                new InstagramLog { UserName = "user1", OccurredAt = new DateTime(2024, 9, 1), Operation = "like" },
                new InstagramLog { UserName = "user2", OccurredAt = new DateTime(2024, 9, 5), Operation = "comment" },
                new InstagramLog { UserName = "user1", OccurredAt = new DateTime(2024, 9, 10), Operation = "share" },
                new InstagramLog { UserName = "user3", OccurredAt = new DateTime(2024, 9, 15), Operation = "like" },
            }.AsQueryable();
        }

        [Fact]
        public void FilterEntities_ByUserName_ReturnsCorrectLogs()
        {
            var filter = new InstagramLogFilter { UserName = "user1" };

            var result = filter.FilterEntities(_testLogs).ToList();

            Assert.Equal(2, result.Count);
            Assert.All(result, log => Assert.Equal("user1", log.UserName));
        }

        [Fact]
        public void FilterEntities_ByFromDate_ReturnsCorrectLogs()
        {
            var filter = new InstagramLogFilter { From = new DateTime(2024, 9, 5) };

            var result = filter.FilterEntities(_testLogs).ToList();

            Assert.Equal(2, result.Count);
            Assert.All(result, log => Assert.True(log.OccurredAt > new DateTime(2024, 9, 5)));
        }

        [Fact]
        public void FilterEntities_ByToDate_ReturnsCorrectLogs()
        {
            var filter = new InstagramLogFilter { To = new DateTime(2024, 9, 10) };

            var result = filter.FilterEntities(_testLogs).ToList();

            Assert.Equal(2, result.Count);
            Assert.All(result, log => Assert.True(log.OccurredAt < new DateTime(2024, 9, 10)));
        }

        [Fact]
        public void FilterEntities_ByOperation_ReturnsCorrectLogs()
        {
            var filter = new InstagramLogFilter { Operation = "like" };

            var result = filter.FilterEntities(_testLogs).ToList();

            Assert.Equal(2, result.Count);
            Assert.All(result, log => Assert.Equal("like", log.Operation));
        }

        [Fact]
        public void FilterEntities_ByMultipleFilters_ReturnsCorrectLogs()
        {
            var filter = new InstagramLogFilter
            {
                UserName = "user1",
                From = new DateTime(2024, 9, 5),
                To = new DateTime(2024, 9, 15),
                Operation = "share"
            };

            var result = filter.FilterEntities(_testLogs).ToList();

            Assert.Single(result);
            Assert.Equal("user1", result[0].UserName);
            Assert.Equal("share", result[0].Operation);
            Assert.True(result[0].OccurredAt > new DateTime(2024, 9, 5));
            Assert.True(result[0].OccurredAt < new DateTime(2024, 9, 15));
        }

        [Fact]
        public void FilterEntities_NoFiltersApplied_ReturnsAllLogs()
        {
            var filter = new InstagramLogFilter();

            var result = filter.FilterEntities(_testLogs).ToList();

            Assert.Equal(4, result.Count);
        }
    }
}
