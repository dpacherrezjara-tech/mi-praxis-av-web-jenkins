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
        const sapForm = Ext.getCmp(prototype.idDE + '-sapForm');
        const tacaflowForm = Ext.getCmp(prototype.idDE + '-tacaflowForm');
        
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
            Ext.getCmp(prototype.idDE + '-tabF1').setTitle(`PHASE 1 (${mpf060.length})`);
            Ext.getCmp(prototype.idDE + '-tabF1').setDisabled(false);
            const grid060 = Ext.getCmp(prototype.idDE + '-gridFase1');
            grid060.setStore(new Ext.data.Store({
                pageSize: 50,
                data: mpf060,
                proxy: {
                    type: 'memory', // Se usa almacenamiento en memoria
                    enablePaging: true
                }
            }));
        }else{
            Ext.getCmp(prototype.idDE + '-tabF1').setDisabled(true);
        }

        if (mpf101.length > 0) {
            Ext.getCmp(prototype.idDE + '-tabF2').setDisabled(false);
            Ext.getCmp(prototype.idDE + '-tabF2').setTitle(`PHASE 2 (${mpf101.length})`);
            const grid060 = Ext.getCmp(prototype.idDE + '-gridFase2');
            grid060.setStore(new Ext.data.Store({
                pageSize: 50,
                data: mpf101,
                proxy: {
                    type: 'memory', // Se usa almacenamiento en memoria
                    enablePaging: true
                }
            }));

        }else{
            Ext.getCmp(prototype.idDE + '-tabF2').setDisabled(true);
        }

        if (mpf091.length > 0) {
            Ext.getCmp(prototype.idDE + '-tabGT').setDisabled(false);
            Ext.getCmp(prototype.idDE + '-tabGT').setTitle(`BILLS (${mpf091.length})`);
            const grid060 = Ext.getCmp(prototype.idDE + '-gridGT');
            grid060.setStore(new Ext.data.Store({
                pageSize: 50,
                data: mpf091,
                proxy: {
                    type: 'memory', // Se usa almacenamiento en memoria
                    enablePaging: true
                }
            }));
        }else{
            Ext.getCmp(prototype.idDE + '-tabGT').setDisabled(true);
        }

        if (mpf140.length > 0) {
            Ext.getCmp(prototype.idDE + '-tabIdcont').setDisabled(false);
            Ext.getCmp(prototype.idDE + '-tabIdcont').setTitle(`ACCOUNTING (${mpf140.length})`);
            const grid060 = Ext.getCmp(prototype.idDE + '-gridIdcont');
            grid060.setStore(new Ext.data.Store({
                data: mpf140
            }));
        }else{
            Ext.getCmp(prototype.idDE + '-tabIdcont').setDisabled(true);
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
          'ACCD':'Debit Accounting'
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

        Ext.getCmp(prototype.idDE + '-treeTotals').setStore(store);
    },
    onChangeTabMain: function(tabPanel, newCard, oldCard){
        this.view.center();
    },
    onCancelClick:function(){
        this.view.close();
    },
    onReloadInfo:function(){
        this.loadData();
    }
});