using System;
using System.Threading.Tasks;
using karoke_api_dotnetcore.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.StaticFiles;

namespace karoke_api_dotnetcore.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class FilesController : ControllerBase
    {
        [HttpPost]
        public async Task<IActionResult> UploadAsync(IFormFile file)
        {
            if (file.Length > 0)
            {
                var fileName = $"{Guid.NewGuid().ToString()}{System.IO.Path.GetExtension(file.FileName)}";
                var filePath = $"{AppDomain.CurrentDomain.BaseDirectory}/files/{fileName}";
                using (var stream = System.IO.File.Create(filePath))
                {
                    await file.CopyToAsync(stream);
                }
                var fileUrl =  new FileUrlDTO
                {
                    Url = $"https://localhost:44385/api/files/{fileName}"
                };
                return Ok(fileUrl);
            }

            throw new Exception();

        }

        [HttpGet("{fileName}")]
        public async Task<IActionResult> GetFileAsync(string fileName)
        {
            Byte[] bytes = null;
            if (!string.IsNullOrEmpty(fileName))
            {
                var filePath = $"{AppDomain.CurrentDomain.BaseDirectory}/files/{fileName}";
                bytes = await System.IO.File.ReadAllBytesAsync(filePath);
            }
            var provider = new FileExtensionContentTypeProvider();
            if (!provider.TryGetContentType(fileName, out string mimeType))
            {
                mimeType = "application/octet-stream";
            }
            Response.Headers.Add("Content-Disposition", "inline; filename=" + fileName);
            return File(bytes, mimeType);
        }
    }
}