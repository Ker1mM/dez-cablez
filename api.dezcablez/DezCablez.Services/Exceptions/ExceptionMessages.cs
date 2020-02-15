using System;
using System.Collections.Generic;
using System.Text;

namespace DezCablez.Services.Exceptions
{
    public static class ExceptionMessages
    {

        /// <summary>
        /// Generates taken error message.
        /// </summary>
        /// <param name="takenName">name of the not unique param</param>
        /// <returns>(param) already exists in the database.</returns>
        public static string TakenGenerator(string takenName)
        {
            return $"{takenName} already exists in the database.";
        }

        public static string NotFoundGenerator(string entityName, string data)
        {
            return $"{entityName} with the ID or Username: {data} does not exist in the database";
        }
    }
}
