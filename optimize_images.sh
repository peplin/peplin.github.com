#!/usr/bin/env bash

set -exu

INPUT_DIR=$1
OUTPUT_DIR=$2

# Process images one by one to work around an issue with bulk conversion in the
# squoosh-cli: https://github.com/GoogleChromeLabs/squoosh/issues/1012
for INPUT_FILE in $INPUT_DIR/*; do
    # TODO dont overwrite the original with a resized version...
    convert -filter Lanczos -resize 1000x1000 $INPUT_FILE $INPUT_FILE
    npx @squoosh/cli --webp '{"quality":83.4,"target_size":0,"target_PSNR":0,"method":4,"sns_strength":50,"filter_strength":60,"filter_sharpness":0,"filter_type":1,"partitions":0,"segments":4,"pass":1,"show_compressed":0,"preprocessing":0,"autofilter":0,"partition_limit":0,"alpha_compression":1,"alpha_filtering":1,"alpha_quality":100,"lossless":0,"exact":0,"image_hint":0,"emulate_jpeg_size":0,"thread_level":0,"low_memory":0,"near_lossless":100,"use_delta_palette":0,"use_sharp_yuv":0}' \
                     --mozjpeg '{"quality":85,"baseline":false,"arithmetic":false,"progressive":true,"optimize_coding":true,"smoothing":0,"color_space":3,"quant_table":3,"trellis_multipass":false,"trellis_opt_zero":false,"trellis_opt_table":false,"trellis_loops":1,"auto_subsample":true,"chroma_subsample":2,"separate_chroma_quality":false,"chroma_quality":75}' \
                     --output-dir $OUTPUT_DIR $INPUT_FILE
done
