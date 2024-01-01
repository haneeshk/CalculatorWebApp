#include <stdio.h>
#include <stdlib.h>
#include <string.h>

int main(int argc, char *argv[]) {
    double result = 0;
    if (argc > 1) {
        char *token = strtok(argv[1], " ");
        while (token != NULL) {
            char *end;
            double val = strtod(token, &end);
            if (end != token) {
                result += val;
            }
            token = strtok(NULL, " ");
        }
    }
    printf("%lf\n", result);
    return 0;
}