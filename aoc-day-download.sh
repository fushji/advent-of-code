#!/bin/sh
# ----------------------------------------------------------------------------------
# aoc-day-download.sh
# 
# Create scaffold for Advent of Code challenge creating empty js source code file and
# download the daily data file.
#
# ----------------------------------------------------------------------------------

help() {
    
    cat <<EOF

    Usage: $(basename $0) -y|--year <YEAR> -d|--day <DAY>

EOF
}

# Login to https://adventofcode.com to get the session token and update it
SESSION_TOKEN=<SESSION_TOKEN>

YEAR=$1
DAY=$2
DIR="${YEAR}/day-${DAY}"
OUTPUT_FILE=${DIR}/data.txt

CMD="curl --silent --ssl-no-revoke"
CMD=${CMD}" -b session=${SESSION_TOKEN}"
CMD=${CMD}" https://adventofcode.com/${YEAR}/day/${DAY}/input"
CMD=${CMD}" -o ${OUTPUT_FILE}"

[ -z "${YEAR}" ] && help && exit 1;
[ -z "${DAY}" ] || [ "${DAY}" -le 0 ] || [ "${DAY}" -gt 25 ] && help && exit 1;

echo "Create directory ${DIR} with source code file"
mkdir -p ${DIR}
touch ${DIR}/part_1.js ${DIR}/part_2.js ${DIR}/data.txt

echo "Download data file for day: ${DAY}"
${CMD}
