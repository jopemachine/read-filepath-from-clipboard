using System;
using System.Windows.Forms;

class Program
{
    [STAThreadAttribute]
    static void Main(string[] args)
    {
        Console.OutputEncoding = System.Text.Encoding.UTF8;

        if (Clipboard.ContainsFileDropList())
        {
            var filesArray = Clipboard.GetFileDropList();

            for (int i = 0; i < filesArray.Count; i++)
            {
                Console.Write(filesArray[i]);

                if (i != filesArray.Count - 1) {
                    Console.Write("\n");
                }
            }
        }
    }
}
