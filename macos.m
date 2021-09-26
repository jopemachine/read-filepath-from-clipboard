#import <Foundation/Foundation.h>
#import "AppKit/NSPasteboard.h"

#ifdef DEBUG
    #define NSLog(FORMAT, ...) fprintf(stdout,"%s", [[NSString stringWithFormat:FORMAT, ##__VA_ARGS__] UTF8String]);
#else
    #define NSLog(...) {}
#endif

int main(int argc, char * argv[]) {
    @autoreleasepool {
        NSPasteboard *pasteboard = [NSPasteboard generalPasteboard];

        NSArray *classes = [NSArray arrayWithObject: [NSURL class]];
        NSDictionary *options = [NSDictionary dictionaryWithObject:
                                  [NSNumber numberWithBool:YES] forKey:NSPasteboardURLReadingFileURLsOnlyKey];
        NSArray *fileURLs =
          [pasteboard readObjectsForClasses:classes options:options];

        for (int i = 0; i < fileURLs.count; ++i) {
            NSLog(@"%@", fileURLs[i]);
            if (i != fileURLs.count - 1) {
                NSLog(@"\n");
            }
        }
    }
}
