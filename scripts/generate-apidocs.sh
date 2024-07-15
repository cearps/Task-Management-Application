#!/bin/bash

docker run --rm -v "${PWD}:/local" openapitools/openapi-generator-cli generate \
    -i /local/apispec/api.yml \
    -g html2 \
    -o /local/apispec/api