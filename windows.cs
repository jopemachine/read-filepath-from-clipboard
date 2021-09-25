using System;
using System.Windows.Forms;

class Program
{
    [STAThreadAttribute]
    static void Main(string[] args)
    {
        if (Clipboard.ContainsFileDropList())
        {
            var filesArray = Clipboard.GetFileDropList();

            foreach (var file in filesArray)
            {
                Console.WriteLine(file);
            }
        }
    }
}
