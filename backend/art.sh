#!/bin/bash

eval "php artisan make:model ${1} -m";
eval "php artisan make:policy ${1}Policy -m ${1}";
eval "php artisan make:request V1/${1}Request";
#eval "php artisan make:resource V1/${2}/${1}Resource";
eval "php artisan make:resource V1/${1}Resource";
#eval "php artisan make:controller V1/${2}/${1}Controller -r -m ${1}";
eval "php artisan make:controller V1/${1}Controller -r -m ${1}";



