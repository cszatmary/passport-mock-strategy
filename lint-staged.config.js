module.exports = {
    '*.ts': ['tslint -p ./tsconfig.json --fix', 'git add'],
};
