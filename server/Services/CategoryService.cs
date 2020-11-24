using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;
using WebApi.Entities;
using WebApi.GraphQl;
using WebApi.Helpers;
using WebApi.Interfaces;
using WebApi.Models;

namespace WebApi.Services
{
    public class CategoryService : ICategoryService
    {
        private DataContext _context;

        public CategoryService(DataContext context)
        {
            _context = context;
        }

        public Category Create(Category category)
        {
           
            _context.Categories.Add(category);
            _context.SaveChanges();

            return category;
        }

        public Category GetById(string id)
        {

            var category = _context.Categories.FirstOrDefault(x => x.CategoryId == id);
            return category;
        }
        public IEnumerable<Category> GetAll()
        {
            return _context.Categories;
        }


        public void Delete(string[] id)
        {
            foreach (var categoryId in id)
            {
                var exercisesInCategory = _context.Exercises.Where(x => x.CategoryId == categoryId);

                foreach (var exerciseItem in exercisesInCategory)
                {
                    exerciseItem.CategoryId = null;
                }

                var category = _context.Categories.Find(categoryId);
                if (category != null)
                {
                    _context.Categories.Remove(category);
                    _context.SaveChanges();
                }
            }
        }

        public void AssignExercise(string id, Exercise exercise)
        {
            var category = _context.Categories.Find(id);

            category.Exercises.Add(exercise);

            _context.Categories.Update(category);
            _context.SaveChanges();
        }

        public void AssignExercisesToCategory(string categoryId, IEnumerable<string> exerciseId)
        {
            var category = GetById(categoryId);

            foreach (var id in exerciseId)
            {
                var element = _context.Exercises.Find(id);
                category.Exercises.Add(element);
            }
            _context.Categories.Update(category);
            _context.SaveChanges();
        }

        public async Task<int> Update(UpdateCategoryModel model, string id)
        {
            try
            {
                var category = await _context.Categories.FindAsync(id);

                if (category == null)
                    throw new AppException("Category not found!");

                if (!string.IsNullOrWhiteSpace(model.Title))
                {
                    category.Title = model.Title;
                }
                _context.Categories.Update(category);
                return await _context.SaveChangesAsync();
            }
            catch (ValidationException)
            {
                return 0;
            }
        }
    }
}


