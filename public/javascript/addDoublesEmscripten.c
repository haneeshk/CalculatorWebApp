#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <gsl/gsl_sf_bessel.h>


double addDoublesEmscripten(double input1, double input2) {
    
    
    return input1+input2;
}



double ComputeBesselJ0 (double x)
{
  
   
  
  return gsl_sf_bessel_J0(x);
}
