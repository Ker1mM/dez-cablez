using DezCablez.Data.Models;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace DezCablez.Services.Interfaces
{
    public interface IImageService
    {
        Task<Image> AddImageAsync(Image img);
    }
}
