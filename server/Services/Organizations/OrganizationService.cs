using System.Collections.Generic;
using System.Linq;
using WebApi.Controllers.ViewModels;
using WebApi.Entities;
using WebApi.Helpers;

namespace WebApi.Services
{
    public interface IOrganizationService
    {
        Organization GetById(string id);
        Organization Create(Organization Organization);
        IEnumerable<Organization> GetAll();
        IEnumerable<User> GetOrganizationUsers(string organizationId);
        IEnumerable<User> GetOrganizationTrainers(string organizationId);
        IEnumerable<User> GetOrganizationClients(string organizationId);
        User GetUserById(string organizationId, string userId);
        void Delete(string[] id);
        void AssignUsersToOrganization(string organizationId, string[] userIds);
        void ChangeRole(string userId, string role);
    }

    public class OrganizationService : IOrganizationService
    {
        private DataContext _context;

        public OrganizationService(DataContext context)
        {
            _context = context;
        }

        public Organization Create(Organization Organization)
        {
            if (_context.Organizations.Any(x => x.Name == Organization.Name))
                throw new AppException("Organization " + Organization.Name + " is already exist");

            _context.Organizations.Add(Organization);
            _context.SaveChanges();

            return Organization;
        }

        public Organization GetById(string id)
        {

            var Organization = _context.Organizations.FirstOrDefault(x => x.OrganizationId == id);
            return Organization;
        }
        public IEnumerable<Organization> GetAll()
        {

            return _context.Organizations;
        }

        public void Delete(string[] id)
        {
            foreach (var OrganizationId in id)
            {
                var organization = _context.Organizations.Find(OrganizationId);
                if (organization != null)
                {
                    _context.Organizations.Remove(organization);
                    _context.SaveChanges();
                }
            }
        }

        public void AssignUsersToOrganization(string organizationId, string[] userIds)
        {
            var organization = GetById(organizationId);

            foreach (var id in userIds)
            {
                var element = _context.Users.Find(id);
                organization.Users.Add(element);
            }
            _context.Organizations.Update(organization);
            _context.SaveChanges();
        }

        public IEnumerable<User> GetOrganizationUsers(string organizationId)
        {
            var users = _context.Users.Where(x => x.OrganizationId == organizationId);
            return users;
        }


        public IEnumerable<User> GetOrganizationClients(string organizationId)
        {
            var usersInOrganization = _context.Users.Where(x => x.OrganizationId == organizationId);
            var clients = usersInOrganization.Where(x => x.Role == "User");
            return clients;
        }

        public IEnumerable<User> GetOrganizationTrainers(string organizationId)
        {
            var usersInOrganization = _context.Users.Where(x => x.OrganizationId == organizationId);
            var trainers = usersInOrganization.Where(x => x.Role == "Trainer");
            return trainers;
        }

        public User GetUserById(string organizationId, string userId)
        {
            var usersInOrganization = _context.Users.Where(x => x.OrganizationId == organizationId);
            var user = usersInOrganization.FirstOrDefault(x => x.OrganizationId == organizationId);
            return user;
        }

        public void ChangeRole(string userId, string role)
        {
            var user = _context.Users.FirstOrDefault(x => x.UserId == userId);

            if (!string.IsNullOrWhiteSpace(role))
                user.Role = role;

            _context.Users.Update(user);
            _context.SaveChanges();
        }
    }
}


