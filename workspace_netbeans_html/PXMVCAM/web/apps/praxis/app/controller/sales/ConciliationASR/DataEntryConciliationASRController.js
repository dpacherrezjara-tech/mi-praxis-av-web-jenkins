Ext.define('Ext.Praxis.controller.sales.ConciliationASR.DataEntryConciliationASRController',{
    extend: 'Ext.app.ViewController',
    alias: 'controller.DataEntryConciliationASRController',
    strToday: '',
    bean: {},
    action: '',
    beanUpd: {},
    vtip: '',
    init: function(view) {
        this.p = this.view.params;
        this.bean = this.p.bean;
        this.action = this.p.action;
    },
    afterRender: function(){ 
        this.get_ClearField();
        this.get_data();
        // global.AccessControlMaganer();
    },
    get_ClearField: function() {
        win.setValue('DataEntry-txtWKSTAT', '');
        win.setValue('DataEntry-txtFREPOR', '');
        win.setValue('DataEntry-txtMDA', '');
        win.setValue('DataEntry-txtHeaderDate', '');
        win.setValue('DataEntry-txtHeaderName', '');
        win.setValue('DataEntry-txtHeaderStatus', '');
        win.setValue('DataEntry-txtSaleCash', '0.00');
        win.setValue('DataEntry-txtSaleCredit', '0.00');
        win.setValue('DataEntry-txtRefundCash', '0.00');
        win.setValue('DataEntry-txtRefundCredit', '0.00');
        win.setValue('DataEntry-txtInteractCA', '');
        win.setValue('DataEntry-txtInteractCC', '');
        win.setValue('DataEntry-txtPraxisCA', '');
        win.setValue('DataEntry-txtPraxisCC', '');
        win.setValue('DataEntry-txtDifferencesCA', '');
        win.setValue('DataEntry-txtDifferencesCC', '');
        win.setValue('DataEntry-txtIndicator', '');
        win.setValue('DataEntry-txtComment', '');
        win.setValue('DataEntry-txtUser', '');
        win.setValue('DataEntry-txtDate', '');
        Ext.getCmp(prototype.id+'-DataEntry-gridTransactions').getStore().removeAll();
        Ext.getCmp(prototype.id+'-DataEntry-boxPraxisDetail').hide();
        Ext.getCmp('DataEntryConciliationASRForm').setHeight(500);
    },
    get_data: function() {
        //para tomar datos del grid "by Amount" o "Praxis vs interact"
        me.vtip = 'A'; //by Amount
        if( this.bean.WKSTAT === undefined ){
            me.vtip = 'P'; //Praxis vs interact
            this.bean.WKSTAT = this.bean.A1530AGENT;            
            this.bean.userLastModify = this.bean.A1530USRAC;
            this.bean.dateLastModify = this.bean.A1530FECAC;
        }
        if( this.bean.FREPOR === undefined )
            this.bean.FREPOR = this.bean.A1530FDESD;
        if( this.bean.MDA === undefined )
            this.bean.MDA = this.bean.A1530MDA;
        //console.log( this.bean );        
        win.setValue('DataEntry-txtWKSTAT', this.bean.WKSTAT);
        win.setValue('DataEntry-txtFREPOR', this.bean.FREPOR);
        win.setValue('DataEntry-txtMDA', this.bean.MDA);
        
        win.setValue('DataEntry-txtHeaderDate', this.bean.HDTE);
        win.setValue('DataEntry-txtHeaderName', this.bean.HNAME);
        win.setValue('DataEntry-txtHeaderStatus', this.bean.HSTATUS);
        
        win.setValue('DataEntry-txtSaleCash', Ext.util.Format.number(this.bean.SCASH, '0,000.00'));
        win.setValue('DataEntry-txtSaleCredit', Ext.util.Format.number(this.bean.SCREDIT, '0,000.00'));
        win.setValue('DataEntry-txtRefundCash', Ext.util.Format.number(this.bean.RCASH, '0,000.00'));
        win.setValue('DataEntry-txtRefundCredit', Ext.util.Format.number(this.bean.RCREDIT, '0,000.00'));
        win.setValue('DataEntry-txtInteractCA', Ext.util.Format.number(this.bean.SCASH - this.bean.RCASH, '0,000.00'));
        win.setValue('DataEntry-txtInteractCC', Ext.util.Format.number(this.bean.SCREDIT - this.bean.RCREDIT, '0,000.00'));
        win.setValue('DataEntry-txtPraxisCA', Ext.util.Format.number(this.bean.A1530_A1720_CA_SUM, '0,000.00'));
        win.setValue('DataEntry-txtPraxisCC', Ext.util.Format.number(this.bean.A1530_A1720_CC_SUM, '0,000.00'));
        win.setValue('DataEntry-txtDifferencesCA', Ext.util.Format.number((this.bean.SCASH - this.bean.RCASH) - this.bean.A1530_A1720_CA_SUM, '0,000.00'));
        win.setValue('DataEntry-txtDifferencesCC', Ext.util.Format.number((this.bean.SCREDIT - this.bean.RCREDIT) - this.bean.A1530_A1720_CC_SUM, '0,000.00'));
        var strIndicator = '';
        switch (this.bean.STATUS) {
            case 'A':
                strIndicator = 'A'; //MATCH AUTOMATIC.
                Ext.getCmp(prototype.id+'-DataEntry-txtIndicator').disable(true);
                win.focus('DataEntry-txtComment');
                break;
            case 'M':
                strIndicator = 'M'; //MATCH MANUAL.
                win.focus('DataEntry-txtIndicator');
                Ext.getCmp(prototype.id+'-DataEntry-txtIndicator').enable(true);
                break;
            case 'D':
                strIndicator = 'D'; //DIFFERENCE.
                win.focus('DataEntry-txtIndicator');
                Ext.getCmp(prototype.id+'-DataEntry-txtIndicator').enable(true);
                break;
            case '': //CALCULATE.
//                console.log(  (parseFloat(this.bean.SCREDIT) - parseFloat(this.bean.RCREDIT))  );
//                console.log(  (Number.parseFloat(this.bean.SCREDIT) - Number.parseFloat(this.bean.RCREDIT))  );  
//ojo
                if(parseFloat(this.bean.SCASH - this.bean.RCASH) - parseFloat(this.bean.A1530_A1720_CA_SUM) === 0 && 
                   parseFloat(this.bean.SCREDIT - this.bean.RCREDIT) - parseFloat(this.bean.A1530_A1720_CC_SUM) === 0
                   //rcredit - parseFloat(this.bean.A1530_A1720_CC_SUM) === 0
                   ){
                    strIndicator = 'A';
                    Ext.getCmp(prototype.id+'-DataEntry-txtIndicator').disable(true);
                    win.focus('DataEntry-txtComment');
                }else{
                    strIndicator = 'D';
                    win.focus('DataEntry-txtIndicator');
                    Ext.getCmp(prototype.id+'-DataEntry-txtIndicator').enable(true);
                }
                break;
            default:
                strIndicator = this.bean.STATUS;
                Ext.getCmp(prototype.id+'-DataEntry-txtIndicator').disable(true);
                win.focus('DataEntry-txtComment');
        }
        win.setValue('DataEntry-txtIndicator', strIndicator);               
        win.setValue('DataEntry-txtComment', this.bean.COMENT);
        win.setValue('DataEntry-txtUser', this.bean.userLastModify);
        win.setValue('DataEntry-txtDate', this.bean.dateLastModify);
    },
    //<editor-fold defaultstate="collapsed" desc="button">
    btnUpdate_clickHandler: function() {
        //Key updated
        this.beanUpd.WKSTAT = this.bean.WKSTAT;
        this.beanUpd.FREPOR  = this.bean.FREPOR;
        this.beanUpd.MDA  = this.bean.MDA;
        this.beanUpd.HDTE  = win.getValue('DataEntry-txtHeaderDate');
        this.beanUpd.HNAME  = win.getValue('DataEntry-txtHeaderName');
        this.beanUpd.HSTATUS  = win.getValue('DataEntry-txtHeaderStatus');
        this.beanUpd.SCASH  = Number(win.getValue('DataEntry-txtSaleCash').replace(',', '').replace(',', ''));
        this.beanUpd.SCREDIT  = Number(win.getValue('DataEntry-txtSaleCredit').replace(',', '').replace(',', ''));
        this.beanUpd.RCASH  = Number(win.getValue('DataEntry-txtRefundCash').replace(',', '').replace(',', ''));
        this.beanUpd.RCREDIT  = Number(win.getValue('DataEntry-txtRefundCredit').replace(',', '').replace(',', ''));
        //User Input	
        this.beanUpd.STATUS = win.getValue('DataEntry-txtIndicator');//(txtIndicator.text == 'A') ? 'M' : txtIndicator.text;
        this.beanUpd.COMENT = win.getValue('DataEntry-txtComment');
        Ext.Msg.show({
            title: '.:PRAXIS:.',
            msg: 'Are you sure to update ?',
            buttons: Ext.MessageBox.YESNO,
            scope: this,
            icon: Ext.MessageBox.QUESTION,
            modal: true,
            fn: function(btn) {
                if (btn === 'yes') {
                    this.setConciliacionASR(this.beanUpd, 'U');
                }
            }
        });
    },
    btnCancel_clickHandler: function(btn){
        this.view.close();
    },
    //</editor-fold>

    lnkPRAXIS_clickHandler: function () {
        this.autoSize();
        var filter = {};
        filter.IN_CSABR = this.bean.HNAME;
        filter.IN_FPROG = this.bean.FREPOR;
        filter.IN_MDA = this.bean.MDA;
        this.loadPX108S03A1530(filter);
    },
    autoSize: function() {
        if(!Ext.getCmp(prototype.id+'-DataEntry-boxPraxisDetail').isVisible()) {
            Ext.getCmp('DataEntryConciliationASRForm').setHeight(Ext.getCmp('DataEntryConciliationASRForm').getHeight() + 96);
            Ext.getCmp(prototype.id+'-DataEntry-boxPraxisDetail').show();
        }
    },
    
    //<editor-fold defaultstate="collapsed" desc="loadPX108S03A1530">
    loadPX108S03A1530: function(filter) {
        Ext.Ajax.request({
            url: prototype.url+'/loadPX108S03A1530',
            method: 'POST',
            timeout: 60000000,
            params: {beanString: JSON.stringify(filter)},
            beforerequest: Ext.getCmp(prototype.id+'-DataEntry-gridTransactions').mask('Loading...'),
            success: function(response, options){
                Ext.getCmp(prototype.id+'-DataEntry-gridTransactions').unmask();
                var res = Ext.JSON.decode(response.responseText);
                if (res.success) {
                    Ext.getCmp(prototype.id + '-DataEntry-gridTransactions').bindStore(
                        Ext.create('Ext.Praxis.store.sales.ConciliationASR.GridPraxisDetail', { data: res.data })
                    );
                    global.clear();
                } else global.Msg({ msg: res.sesion });
            },
            failure: function(response, opts) {
                Ext.getCmp(prototype.id+'-DataEntry-gridTransactions').unmask();
                console.log('server-side failure with status code '+response.status);
            }
        });
    },
    //</editor-fold>
    //<editor-fold defaultstate="collapsed" desc="setConciliacionASR">
    setConciliacionASR: function(beanUpd, strOption) {
        var meDataEntry = this;
        Ext.Ajax.request({
            url: prototype.url+'/setConciliacionASR',
            method: 'POST',
            timeout: 60000000,
            params: {beanString: JSON.stringify(beanUpd), strOption: strOption},
            beforerequest: Ext.getCmp('DataEntryConciliationASRForm').mask('Loading...'),
            success: function (response, opts) {
                Ext.getCmp('DataEntryConciliationASRForm').unmask();
                var res = Ext.JSON.decode(response.responseText);
                if(res.success) {
                    if (Boolean(res.RTN)) {
                        global.Msg({msg: 'Record updated'});
                        meDataEntry.btnCancel_clickHandler();
                        //console.log(me.vtip);
                        if (me.vtip === 'P' ) me.btnSearch_click(); //loadPX031S03A1530 (desde grid PRAXIS VS Interact)
                        else me.tnvMain_changeHandler();            //loadPX108S02PXF053  (desde grid By amount de Interact VS PRAXIS)                 
                        
                    } else {
                        global.Msg({msg: 'An error ocurred, pleas try again.'});
                    }
                } else global.Msg({ msg: res.sesion });
            },
            failure: function(response, opts) {
                Ext.getCmp('DataEntryConciliationASRForm').unmask();
                console.log('server-side failure with status code '+response.status);
            }
        });
    },
    //</editor-fold>
    
    onUpperValue: function(field, newValue, oldValue){
        field.setValue(newValue.toUpperCase());
    },
    onTextKeypress: function( obj , e , eOpts){
        if ( e.getKey() === e.ENTER ){
            this.btnSearch_click();
        }
    }
});