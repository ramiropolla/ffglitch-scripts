#! /bin/sh

export DISPLAY=:0
export BIN_DIR="/home/ffglitch/code/ffglitch/build/"
export SCRIPT_DIR="/home/ffglitch/code/ffglitch/ffglitch-scripts/sbc/scripts/"
export INPUT="-input_format mjpeg -video_size 1920x1080 -i /dev/video0"
export ENCODE="-vf hflip -mpv_flags +nopimb+forcemv -qscale:v 1 -fcode 6 -sc_threshold max -g max -vcodec mpeg4"
export FFGAC_SCRIPT="-mb_type_script ${SCRIPT_DIR}mb_type.js -pict_type_script ${SCRIPT_DIR}pict_type.js"
export FFLIVE_SCRIPT="-s ${SCRIPT_DIR}mv_pan.js"

${BIN_DIR}ffgac ${INPUT} ${FFGAC_SCRIPT} ${ENCODE} -f avpipe pipe: | ${BIN_DIR}fflive -i pipe: ${FFLIVE_SCRIPT} -fs
