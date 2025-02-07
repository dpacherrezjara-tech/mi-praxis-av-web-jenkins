Ext.define('Ext.Praxis.controller.payments.AccountingMasterProcess.ProcessAccountingDataEntryController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.ProcessAccountingDataEntryController',
    url: CONTEXTPATH + '/AccountingReport',
    request: axios.create({
        baseURL: CONTEXTPATH + '/AccountingReport',
        timeout: 0
    }),
    notifier: new AWN(),
    afterRender: function () {
        this.loadFilters();
    },
    loadFilters: function () {
        const me = this;
        me.procesadores = Object.assign([], me.view.procesadores);
        const ccust = Ext.getCmp(prototype.idDE + '-cmbCcust');
        ccust.fireEvent('change', {});
    },
    onChangeTipocon: function () {
        const ccust = Ext.getCmp(prototype.idDE + '-cmbCcust');
        ccust.fireEvent('change', {});
    },
    onChangeCcust: function () {
        const me = this;
        const cmbCccust = Ext.getCmp(prototype.idDE + '-cmbCcust');
        const tipocon = Ext.getCmp(prototype.idDE + '-cmbTIPOCON');
        const cmbProc = Ext.getCmp(prototype.idDE + '-cmbCODPRO');
        const cmbTdate = Ext.getCmp(prototype.idDE + '-cmbTdate');
        switch (tipocon.value) {
            case 'ADM':
                cmbTdate.setValue('SDATE');
                cmbProc.setValue('');
                cmbProc.hide();
                break;
            case 'ADJ':
                cmbTdate.setValue('FEUP');
                cmbProc.show();
                me.setProcessors(tipocon,cmbCccust,cmbProc);
                break;
            default:
                cmbTdate.setValue('VALDATE');
                cmbProc.show();
                me.setProcessors(tipocon,cmbCccust,cmbProc);
                break;
        }
        //global.setComboStore(cmbProc, data, 'A4451KEY2', 'A4451DESC1', '');
    },
    setProcessors: function (tipocon,cmbCccust,cmbProc) {
        const me = this;
        let data = me.procesadores.filter(x =>
            x.A4451CCUST === cmbCccust.value && x.A4451CORRL === tipocon.value);
        let store = new Ext.data.Store({
            data: data
        });
        cmbProc.setStore(store);
        if (cmbCccust.value === '134') {
            cmbProc.setValue('CO');
        } else {
            cmbProc.setValue(data.at(0).A4451KEY2);
        }
    },
    onProcessClick: function (btn) {
        let params = this.formatParameters();
        console.log('Execute Params: ', params);

        //* Accounting Date can't be greater than  from and to
        // IN_FCONT > IN_PRDAF
        // IN_FCONT > IN_PRDAT
        const {IN_FCONT, IN_PRDAF, IN_PRDAT} = params;

        let date_IN_FCONT = new Date(IN_FCONT.substring(0, 4), IN_FCONT.substring(4, 6) - 1, IN_FCONT.substring(6, 8));
        let date_IN_PRDAF = new Date(IN_PRDAF.substring(0, 4), IN_PRDAF.substring(4, 6) - 1, IN_PRDAF.substring(6, 8));
        let date_IN_PRDAT = new Date(IN_PRDAT.substring(0, 4), IN_PRDAT.substring(4, 6) - 1, IN_PRDAT.substring(6, 8));

        // console.log({date_IN_FCONT, date_IN_PRDAF, date_IN_PRDAT});        

        if (date_IN_FCONT < date_IN_PRDAF || date_IN_FCONT < date_IN_PRDAT) {
            Ext.Msg.show(
                    {
                        title: '.:PRAXIS:.',
                        msg: "The field Accounting Date can't be greater than From and To",
                        buttons: Ext.MessageBox.OK,
                        scope: this,
                        animateTarget: btn,
                        icon: Ext.MessageBox.WARNING,
                        modal: true
                    });
            return;
        }

        Ext.Msg.show(
                {
                    title: '.:PRAXIS:.',
                    msg: 'Are you sure to process?',
                    buttons: Ext.MessageBox.YESNO,
                    scope: this,
                    animateTarget: btn,
                    icon: Ext.MessageBox.QUESTION,
                    modal: true,
                    fn: function (btn) {
                        if (btn === 'yes') {
                            this.loadAccounting(params);
                        }
                    }
                });
    },
    loadAccounting: async function (params) {
        const me = this;
        me.view.setLoading(true);
        try {
            const res = await me.request.post('processAccounting', params);
            const {STATUS, MSG} = res.data;
            if (STATUS) {
                me.notifier.success(MSG);
            } else {
                me.notifier.alert(MSG);
            }
        } catch (e) {
            console.error(e);
        } finally {
            me.view.setLoading(false);
        }

    },
    formatParameters: function () {
        let params = Ext.getCmp(prototype.idDE + '-mainForm')
                .getForm()
                .getValues();
        return params;
    },
    onCancelClick: function () {
        this.view.close();
    }
});
