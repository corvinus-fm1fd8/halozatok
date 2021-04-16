using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SzamHal.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TesztController : ControllerBase
    {
        [HttpGet]

        //get típusú HTTP kérésre válaszol a fv.
        [Route("corvinus/szerverido")]
        //beállítja, hogy milyen route-on legyen elérhető az endpoint
        public IActionResult M1()
        {
            string pontosIdő = DateTime.Now.ToShortTimeString();

            return new ContentResult
            {

                ContentType = System.Net.Mime.MediaTypeNames.Text.Plain, //"text/plain"
                Content = pontosIdő //string típusú (visszaküldendő válasz)

            };
        }

    }
}
