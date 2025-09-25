Ext.define('Ext.Praxis.controller.payments.AccountingReport.BandocDetailDataEntryController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.BandocDetailDataEntryController',
    init: function (view) {

    },
    afterRender: function () {
        this.loadData();
    },
    loadData: async function () {
        const me = this;
        me.view.setLoading(true);
        try {
            const res = await global.callStoreGet('PRAXISMP', 'SPACR025', me.view.searchParams);
            me.bindInfo(res.lstRs);
        } catch (e) {
            console.error(e);
            global.Msg({msg:'Error on Load'});
            me.view.close();
        } finally {
            me.view.center();
            me.view.setLoading(false);
        }

    },
    bindInfo: function (data) {
        const me = this;
        //informacion
        let mpf102 = data.at(0).at(0);
        global.cleanPXobj(mpf102);
        let mpf060 = data.at(1);
        let mpf101 = data.at(2);
        let mpf091 = data.at(3);
        let mpf140 = data.at(6);
        let totals = data.at(7);

        //formularios
        const sapForm = Ext.getCmp(prototype.idBandoc + '-sapForm');
        const tacaflowForm = Ext.getCmp(prototype.idBandoc + '-tacaflowForm');

        //tacaflow information
        if (me.view.searchParams.IN_BANDOC.slice(0,2) === 'CM'){
            tacaflowForm.show();
            sapForm.hide();
            tacaflowForm.getForm().setValues(mpf102);
        }else{
            tacaflowForm.hide();
            sapForm.show();
            sapForm.getForm().setValues(mpf102);
        }

        if (mpf060.length > 0) {
            Ext.getCmp(prototype.idBandoc + '-tabF1').setTitle(`PHASE 1 (${mpf060.length})`);
            Ext.getCmp(prototype.idBandoc + '-tabF1').setDisabled(false);
            const grid060 = Ext.getCmp(prototype.idBandoc + '-gridFase1');
            grid060.setStore(new Ext.data.Store({
                pageSize: 50,
                data: mpf060,
                proxy: {
                    type: 'memory', // Se usa almacenamiento en memoria
                    enablePaging: true
                }
            }));
        }else{
            Ext.getCmp(prototype.idBandoc + '-tabF1').setDisabled(true);
        }

        if (mpf101.length > 0) {
            Ext.getCmp(prototype.idBandoc + '-tabF2').setDisabled(false);
            Ext.getCmp(prototype.idBandoc + '-tabF2').setTitle(`PHASE 2 (${mpf101.length})`);
            const grid060 = Ext.getCmp(prototype.idBandoc + '-gridFase2');
            grid060.setStore(new Ext.data.Store({
                pageSize: 50,
                data: mpf101,
                proxy: {
                    type: 'memory', // Se usa almacenamiento en memoria
                    enablePaging: true
                }
            }));

        }else{
            Ext.getCmp(prototype.idBandoc + '-tabF2').setDisabled(true);
        }

        if (mpf091.length > 0) {
            Ext.getCmp(prototype.idBandoc + '-tabGT').setDisabled(false);
            Ext.getCmp(prototype.idBandoc + '-tabGT').setTitle(`BILLS (${mpf091.length})`);
            const grid060 = Ext.getCmp(prototype.idBandoc + '-gridGT');
            grid060.setStore(new Ext.data.Store({
                pageSize: 50,
                data: mpf091,
                proxy: {
                    type: 'memory', // Se usa almacenamiento en memoria
                    enablePaging: true
                }
            }));
        }else{
            Ext.getCmp(prototype.idBandoc + '-tabGT').setDisabled(true);
        }

        if (mpf140.length > 0) {
            Ext.getCmp(prototype.idBandoc + '-tabIdcont').setDisabled(false);
            Ext.getCmp(prototype.idBandoc + '-tabIdcont').setTitle(`ACCOUNTING (${mpf140.length})`);
            const grid060 = Ext.getCmp(prototype.idBandoc + '-gridIdcont');
            grid060.setStore(new Ext.data.Store({
                data: mpf140
            }));
        }else{
            Ext.getCmp(prototype.idBandoc + '-tabIdcont').setDisabled(true);
        }

        let treeData = {};

        let opts = {
          'EXTR':'Bank Statement',
          'LQF1':'Phase 1',
          'LQF2':'Phase 2',
          'COMM':'Commission',
          'COMT':'Total Comm.',
          'RFUE':'Rte. Fue.',
          'RIVA':'Rte. IVA',
          'RICA':'Rte. ICA',
          'BILL':'Taxes/Bills',
          'REGUL':'Master Sale',
          'ACCR':'Regular Accounting',
          'DEBIT':'Debits Database',
          'ACCD':'Debit Accounting',
          'ACCA':'Adjustment Accounting'
        };

        // Agrupar datos por TIPO
        totals.forEach(record => {
            if (!treeData[record.TIPO]) {
                treeData[record.TIPO] = {
                    text: record.TIPO, // Asegurar que el título sea el TIPO
                    expanded: true,
                    CONCEPTO: opts[record.TIPO], // Agregar columnas vacías para que no aparezca "root"
                    PKEY: '',
                    MONEDA: '',
                    MONTO: '',
                    MONEDAR: '',
                    MONTOR: '',
                    ADJ: '',
                    COLOR:'H',
                    children: []
                };
            }
            treeData[record.TIPO].children.push({
                CONCEPTO: record.CONCEPTO,
                PKEY: record.PKEY,
                MONEDA: record.MONEDA,
                MONTO: record.MONTO,
                MONEDAR: record.MONEDAR,
                MONTOR: record.MONTOR,
                ADJ: record.ADJ,
                COLOR:'D',
                leaf: true
            });
        });

        // Crear y asignar el Store al TreePanel
        let store = Ext.create('Ext.data.TreeStore', {
            root: {
                expanded: true,
                children: Object.values(treeData)
            }
        });

        Ext.getCmp(prototype.idBandoc + '-treeTotals').setStore(store);
    },
    onChangeTabMain: function(tabPanel, newCard, oldCard){
        this.view.center();
    },
    onCancelClick:function(){
        this.view.close();
    },
    onReloadInfo:function(){
        this.loadData();
    },
    onDownloadExcel: function () {
        const me = this;
        let params = me.view.searchParams;
        console.log('Download Params: ', params);
        Ext.Msg.show(
                {
                    title: '.:PRAXIS:.',
                    msg: 'Download Excel?',
                    buttons: Ext.MessageBox.YESNO,
                    scope: this,
                    icon: Ext.MessageBox.QUESTION,
                    modal: true,
                    fn: function (btn) {
                        if (btn === 'yes') {
                            global.downloadFile(me.request, 'downloadExcelSettlements', params, 'xlsx');
                        }
                    }
                });
    },

    onDownloadLiquidation: function () {
        const me = this;
        console.log('liquidation',me.view.searchParams);

        let params = {
            ...me.view.searchParams,
            'IN_IDCONT': ''
        };
        console.log('Download Params: ', params);
        Ext.Msg.show(
                {
                    title: '.:PRAXIS:.',
                    msg: 'Download File?',
                    buttons: Ext.MessageBox.YESNO,
                    scope: this,
                    icon: Ext.MessageBox.QUESTION,
                    modal: true,
                    fn: function (btn) {
                        if (btn === 'yes') {
//                        global.downloadFile(me.request,'downloadExcelErrors',params,'xlsx');
                            this.downloadExcel(params);
                        }
                    }
                });
    },

    downloadExcel: async function (params) {
        console.log('txt');
        let me = this;
        me.view.setLoading(true);
        
        console.log('params')

        try {
            let lst = await global.callStoreGet('PRAXISMP', 'MPS295', params);
            console.log('data inicial', lst);
            const lstVals = lst.lstRs[0];

            if (!lst || !lst.lstRs || !Array.isArray(lst.lstRs[0]) || lst.lstRs[0].length === 0) {
                me.view.setLoading(false);
                global.Msg({
                    msg: 'Data not found'
                });
                return;
            }
            ;

            let lstJson = lstVals.map(x => {
                global.cleanPXobj(x);
                let obj = {
                    'Bank Doc': x.BANDOC,
                    'Card Number': x.SCARDN,
                    'Auth Code': x.SAUTHOC,
                    'Date': x.SDATE,
                    'Settl. Amount': x.SVFOP,
                    'Currency': x.SCURRENCY,
                    'Pay Amount': x.IMPORTEPAG,
                    'Pay Currency': x.MONEDAPAGO,
                    'IATA': x.SAGENT,
                    'Merchant': x.MERCHNC,
                    'Status': this.formatStatus(x.STVAL),
                    'Gencon': x.GENCON,
                    'Sale Amount ': x.SUMA_VTA,
                    'Sale Currency': x.MDA_VTA,
                    'Qty Ticket': x.QTY_TKT,
                    'Diff': x.SUM_DIFF,
                    'Tickets':x.LST_TKT,
                };
                return obj;
            });
            await global.writeExcelFromJson(lstJson, 'Liquidation Report');
            me.view.setLoading(false);

        } catch (err) {
            console.error("Error on load Grid", err);
            me.view.setLoading(false);
            global.Msg({msg: "Data not found "})
        }



    },

    formatStatus: function (x) {
        let opts = {
            '1': 'Match',
            '5': 'Match Manual'
        };
        return opts[x] || '';
    }
});