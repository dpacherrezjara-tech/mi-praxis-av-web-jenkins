Ext.define('Ext.Praxis.controller.payments.HeadersReport.SequencesGridController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.SequencesGridController',
    url: CONTEXTPATH + '/HeadersReport',
    procesadores: [],
    request: axios.create({
        baseURL: CONTEXTPATH + '/HeadersReport',
        timeout: 0
    }),
    notifier: new AWN(),
    init: function (view) {
    },
    afterRender: async function () {
        this.getData();
    },
    getData: function () {
        const me = this;
        const view = me.view;
        const params = Ext.apply({}, view.searchParams);
        if (params.IN_DATEF && params.IN_DATEF.length === 6)
            params.IN_DATEF = params.IN_DATEF.slice(2); // → "2401"
        if (params.IN_DATET && params.IN_DATET.length === 6)
            params.IN_DATET = params.IN_DATET.slice(2); // → "2510"
        let store = global.callStorePaggin('PRAXISMP', 'MPS307', params);
        // console.log("store: ", store)
        view.setStore(store);
    },
    // Acción para Excel o clics
    downloadExcel: function () {
        Ext.Msg.alert('Export', 'Exportar secuencias a Excel próximamente.');
    },
    onUpdateSequences: function (grid, td, rowIndex, cellIndex, e, record, tr, eOpts) {
        const me = this;
        global.cleanPXobj(record.data);

        console.log(record.data);

        const dataEntry = Ext.create('Ext.Praxis.view.payments.HeadersReportForm.DataEntrys.SequencesDataEntry', {
            id: prototype.id + '-SequencesDataEntry-1',
            obj: record.data,
            filters: me.view.filters,
            reloadGrid: () => {
                me.view.getStore().load();
            }
        });
        dataEntry.show();


        //     console.log("data filters: ", me.view.filters);
        /*
        const dataEntry = Ext.create('Ext.Praxis.view.payments.HeadersReportForm.DataEntrys.SequencesDataEntry', {
            id: prototype.id + '-SequencesDataEntry-1',
            praxisId: record.data.IDCONT,
            filters: me.view.filters,
            recordData: record.data,
            reloadGrid: ()=>{
                me.view.getStore().load();
            }
        });
        dataEntry.show();

        // Luego de mostrarla, llenamos los datos del encabezado
        const fileDetails = dataEntry.down('#' + prototype.idDEsequence + '-fileDetails');

        if (fileDetails && record.data) {
            for (let key in record.data) {
                const field = fileDetails.down(`#${key}`);
                if (field) {
                    let value = record.data[key];

                    // === Formateos específicos ===
                    if (key === 'TYPE') {
                        const typeMap = {
                            'DEB': 'Debits',
                            'REG': 'Regular',
                            'ADJ': 'Adjustment'
                        };
                        value = typeMap[value] || value;
                    }

                    if (key === 'STATUS_PRAXIS') {
                        const praxisMap = {
                            '1': 'SFTP',
                            '2': 'LOADED TO SAP',
                            '4': 'TOTAL REJECTED',
                            '5': 'PARTIAL REJECTED',
                            'R': 'MANUAL REJECTED',
                            'L': 'MANUAL LOADED',
                            'S': 'RESOLVED'
                        };
                        value = praxisMap[value] || value;
                    }

                    if (key === 'STATUS_SAP') {
                        const sapMap = {
                            'SUCCESS': 'SUCCESS',
                            'DUPLICATED': 'DUPLICATED',
                            'REJECTED': 'REJECTED',
                            'RESOLVED': 'RESOLVED'
                        };
                        value = sapMap[value?.toUpperCase().trim()] || 'PENDING';
                    }

                    field.setValue(value);

                    // === Estilo tipo input (solo visual) ===
                    field.setFieldStyle({
                        'background-color': '#f5f7f7', // celeste claro
                        'border': '1px solid #b5b8c8', // borde celeste tenue
                        'color': '#000',
                        'font-weight': '200',
                        'text-align': 'center',
                        'line-height': '22px',
                        // 'padding': '2px 4px'    
                    });
                }
            }
        }
        ;

        const userDetails = dataEntry.down('#' + prototype.idDEsequence + '-userDetails');
        if (userDetails && record.data) {
            for (let key in record.data) {
                const field = userDetails.down(`#${key}`);
                if (field) {
                    let value = record.data[key];

                    if (key === 'TSCR') {
                        value = global.formatTimeStamp(value)
                    }

                    if (key === 'TSUP') {
                        value = global.formatTimeStamp(value)
                    }

                    field.setValue(value);

                    field.setFieldStyle({
                        'background-color': '#f5f7f7', // celeste claro
                        'border': '1px solid #b5b8c8', // borde celeste tenue
                        'color': '#000',
                        'font-weight': '200',
                        'text-align': 'center',
                        'line-height': '22px',
                        // 'padding': '2px 4px' 
                    });
                }
            }
        }
        ;*/

    },
});
