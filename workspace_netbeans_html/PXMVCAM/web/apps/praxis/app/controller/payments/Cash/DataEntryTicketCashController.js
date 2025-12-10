Ext.define('Ext.Praxis.controller.payments.Cash.DataEntryTicketCashController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.DataEntryTicketCashController',
    bean: {},
    meDE: '',
    actionCode: '',
    init: function (view) {
        prototype.id = 'CashForm';
        prototype.url = CONTEXTPATH + '/Cash';
        meDE = this;
        this.p = this.view.params;
        this.actionCode = this.p.action;
        this.bean = this.p.rec;
    },
    afterRender: function () {
        switch (this.actionCode) {
            case 'U':
                this.mostrarData();
                break;
        }
    },
    //<editor-fold defaultstate="collapsed" desc="button">
    onCancelClick: function (btn) {
        this.view.close();
    },
    onUpdateClick: function (btn) {
        Ext.Msg.show({
            title: '.:Confirmation:.',
            msg: 'Are you sure to Update?',
            buttons: Ext.MessageBox.YESNO,
            scope: this,
            icon: Ext.MessageBox.QUESTION,
            modal: true,
            fn: function (btn) {
                if (btn === 'yes') {
                    var beanTemp = {};
                    beanTemp = this.llenarData();
                    beanTemp.option = 'U';
                    this.MaintenanceMPF100(beanTemp);
                }
            }
        });
    },
    //</editor-fold>
    MaintenanceMPF100: function (beanTemp) {
//        var beanString = JSON.stringify(beanTemp);
        console.log(beanTemp);
        Ext.Ajax.request({
            url: prototype.url + '/MaintenanceMPF100',
            method: 'POST',
            timeout: 60000000,
            params: beanTemp,
//            params: {beanString: beanString},
            beforerequest: Ext.getCmp('DataEntryTicketCashForm').mask('Loading...'),
            success: function (response, opts) {
                Ext.getCmp(prototype.id + '-DataEntryTicketCashForm').unmask('Loading...');
                var res = Ext.JSON.decode(response.responseText);
                console.log(res);

                if (res.success) {
                    global.Msg({msg: res.Mensaje});
                    Ext.getCmp('DataEntryTicketCashForm').unmask();
                    Ext.getCmp(prototype.id + '-DataEntryTicketCashForm').close();
                    Ext.getCmp(prototype.id + '-btnSearch').fireEvent('click', {});
                } else
                    global.Msg({msg: ''});
            }
        });
    },
    //<editor-fold defaultstate="collapsed" desc="mostrarData">
    mostrarData: function () {
        const TDOC_SALES_MAP = {
            S: "Sales",
            A: "Adjust.",
            D: "Dispute"
        };

        const STATUS_MAP = {
            1: "Match",
            2: "Sales without Reconcili.",
            3: "Trans. without Reconcili.",
            4: "Match with Differences",
            5: "Match Manual"
        };

//      ticket information
        this.setValue('2-txtTicket', this.bean.data.strTicket);
        this.setValue('2-txtSEQ', this.bean.data.SEQ);
        this.setValue('2-cmbTDOC', TDOC_SALES_MAP[this.bean.data.TDOC] || 'Unknown');
        this.setValue('2-cmbFTE', this.bean.data.CFUENTE);
        this.setValue('2-cmbSTVAL', STATUS_MAP[this.bean.data.STVAL] || 'Unknown');

//        sales information
        this.setValue('2-txtCountry', this.bean.data.SCOUNTRY);
        this.setValue('2-txtAgent', this.bean.data.SAGENT);
        this.setValue('2-txtSdate', this.bean.data.SDATE);
        this.setValue('svfop', this.bean.data.SVFOP);
        this.setValue('currency', this.bean.data.SCURRENCY);

//        Reconciliation Information
        this.setValue('2-txtDateConciliation', this.bean.data.DATCO);
        this.setValue('2-txtTransConci', this.bean.data.strDATECTRANC);
        this.setValue('2-txtbandoc', this.bean.data.BANDOC);

//        control data
        this.setValue('2-txtCreateUser', this.bean.data.USCR);
        this.setValue('2-txtCreationDate', this.bean.data.FECR);
        this.setValue('2-txtCreationTime', this.bean.data.HOCR);
        this.setValue('2-txtUserUpdate', this.bean.data.USUP);
        this.setValue('2-txtUpdateDate', this.bean.data.FEUP);
        this.setValue('2-txtUpdateTime', this.bean.data.HOUP);
    },
    //</editor-fold>
    onUpperValue: function (field, newValue, oldValue) {
        field.setValue(newValue.toUpperCase());
    },
    getValue: function (id) {
        return Ext.getCmp(prototype.id + '-' + id).getValue();
    },
    setValue: function (id, txt) {
        Ext.getCmp(prototype.id + '-' + id).setValue(txt);
    }
});