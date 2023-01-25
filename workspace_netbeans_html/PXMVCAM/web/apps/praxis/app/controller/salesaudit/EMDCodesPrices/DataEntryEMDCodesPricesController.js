    Ext.define('Ext.Praxis.controller.salesaudit.EMDCodesPrices.DataEntryEMDCodesPricesController',{
    extend: 'Ext.app.ViewController',
    alias: 'controller.DataEntryEMDCodesPricesController',
    beanBrow: {},
    actionCode: 'V',
    filtroRFIC: '',
    filtroRFIS: '',
    beanMant: {},
    init: function(view) {
    },
    afterRender: function(){
        switch(this.actionCode){
            case 'V':
                this.mostrarData();
                this.handlerEvent_EditInput(false);
                win.visible('1-btn-save', false);
                win.visible('1-btn-update', false);
                win.visible('1-btn-delete', false);
                break;
            case 'I':
                this.handlerEvent_EditInput(true);
                win.visible('1-btn-save', true);
                win.visible('1-btn-update', false);
                win.visible('1-btn-delete', false);
                win.focus('1-txtA2665RFIS');
                break;
            case 'U':
                this.mostrarData();
                this.handlerEvent_EditInput(false);
                win.visible('1-btn-save', false);
                win.visible('1-btn-update', true);
                win.visible('1-btn-delete', true);
                break;
        }
    },
    mostrarData: function () {
        win.setValue('1-txtA2665RFIC', this.beanBrow.A2665RFIC.trim());
        win.setValue('1-txtA2665RFIS', this.beanBrow.A2665RFIS.trim());
        win.setValue('1-txtA2665EMDTP', this.beanBrow.A2665EMDTP.trim());
        win.setValue('1-txtA2665DESCR', this.beanBrow.A2665DESCR.trim());
        win.setValue('1-txtA2665GROUP', this.beanBrow.A2665GROUP.trim());
        win.setValue('1-txtA2665DMSTC', this.beanBrow.A2665DMSTC.toFixed(2));
        win.setValue('1-txtA2665MDADO', this.beanBrow.A2665MDADO.trim());
        win.setValue('1-txtA2665INTNC', this.beanBrow.A2665INTNC.toFixed(2));
        win.setValue('1-txtA2665MDAIN', this.beanBrow.A2665MDAIN.trim());
        win.setValue('1-txtA2665DMSTC2', this.beanBrow.A2665RDMST.toFixed(2));
        win.setValue('1-txtA2665INTNC2', this.beanBrow.A2665RINTN.toFixed(2));
        win.setValue('1-txtFechaOpen', this.beanBrow.A2665EFECT.substring(0,4)+'/'+this.beanBrow.A2665EFECT.substring(6,4)+'/'+this.beanBrow.A2665EFECT.substring(6,8));
        win.setValue('1-txtFechaClose', this.beanBrow.A2665DESCO.substring(0,4)+'/'+this.beanBrow.A2665DESCO.substring(6,4)+'/'+this.beanBrow.A2665DESCO.substring(6,8));
        win.setValue('1-txtA2665CORRL', this.beanBrow.A2665CORRL.trim());
        
        win.setValue('1-txtA2665REGIS', this.beanBrow.A2665REGIS.trim());
        win.setValue('1-txtA2665FREGI', this.beanBrow.A2665FREGI.trim());
        win.setValue('1-txtA2665HREGI', this.beanBrow.A2665HREGI.trim());
        win.setValue('1-txtA2665REVIS', this.beanBrow.A2665REVIS.trim());
        win.setValue('1-txtA2665FREVI', this.beanBrow.A2665FREVI.trim());
        win.setValue('1-txtA2665HREVI', this.beanBrow.A2665HREVI.trim());
    },
    handlerEvent_EditInput: function (flag) {
        Ext.getCmp(prototype.id+'-1-txtA2665RFIC').setReadOnly(!flag);
        Ext.getCmp(prototype.id+'-1-txtA2665RFIS').setReadOnly(!flag);
    },
    //<editor-fold defaultstate="collapsed" desc="button">
    btnInsert_clickHandler: function () {
        this.beanMant.VP_OPCION = this.actionCode;
        this.beanMant.A2665CCUST = '139';
        this.beanMant.VP_RFIC  = win.getValue('1-txtA2665RFIC').trim();
        this.beanMant.VP_RFIS  = win.getValue('1-txtA2665RFIS').trim();
        this.beanMant.A2665RFIC = this.beanMant.VP_RFIC;
        this.beanMant.A2665RFIS = this.beanMant.VP_RFIS;          	
        this.beanMant.A2665EMDTP = win.getValue('1-txtA2665EMDTP').trim();
        this.beanMant.A2665DESCR = win.getValue('1-txtA2665DESCR').trim(); 
        this.beanMant.A2665GROUP = win.getValue('1-txtA2665GROUP').trim();
        var txtA2665DMSTC = win.getValue('1-txtA2665DMSTC');
        if (txtA2665DMSTC.length > 0) this.beanMant.A2665DMSTC = parseFloat(txtA2665DMSTC);
        else this.beanMant.A2665DMSTC = 0.00;
        this.beanMant.A2665MDADO = win.getValue('1-txtA2665MDADO');
        var txtA2665INTNC = win.getValue('1-txtA2665INTNC');
        if (txtA2665INTNC.length > 0) this.beanMant.A2665INTNC = parseFloat(txtA2665INTNC);
        else this.beanMant.A2665INTNC = 0.00;
        this.beanMant.A2665MDAIN   = win.getValue('1-txtA2665MDAIN');
        var txtA2665DMSTC2 = win.getValue('1-txtA2665DMSTC2');
        if (txtA2665DMSTC2.length > 0) this.beanMant.A2665RDMST = parseFloat(txtA2665DMSTC2);
        else this.beanMant.A2665RDMST = 0.00;
        var txtA2665INTNC2 = win.getValue('1-txtA2665INTNC2');
        if (txtA2665INTNC2.length > 0) this.beanMant.A2665RINTN = parseFloat(txtA2665INTNC2);
        else this.beanMant.A2665RINTN = 0.00;
        this.beanMant.A2665EFECT = Ext.util.Format.date(Ext.getCmp(prototype.id+'-1-txtFechaOpen').getValue(), 'Ymd');
        this.beanMant.A2665DESCO = Ext.util.Format.date(Ext.getCmp(prototype.id+'-1-txtFechaClose').getValue(), 'Ymd');
        this.beanMant.A2665APLIC   = 'Y';
        
        // VALIDATE

        if (this.beanMant.A2665INTNC === undefined ){
                this.beanMant.A2665INTNC=0.00;
        }
        if (this.beanMant.A2665DMSTC === undefined ){
                this.beanMant.A2665DMSTC=0.00;
        }
        if (this.beanMant.VP_RFIC === ''){
            win.focus('1-txtA2665RFIC');
            global.Msg({msg: 'Required Field, RFIC'});
            return;
        }

        if (this.beanMant.A2665DMSTC === undefined && this.beanMant.A2665INTNC === undefined  ){
            this.beanMant.A2665APLIC   = 'N'	;
        }

        if (this.beanMant.A2665DMSTC == 0.00 && this.beanMant.A2665INTNC == 0.00 ){
            this.beanMant.A2665APLIC   = 'N'	;
        }

        if (this.beanMant.VP_RFIS === ''){
            win.focus('1-txtA2665RFIS');
            global.Msg({ msg: 'Required Field, RFIS' });
            return;
        }
        if (this.beanMant.A2665EMDTP === ''){
            win.focus('1-txtA2665EMDTP');
            global.Msg({msg: 'Required Field, Type EMD'});
            return;
        }
        if (this.beanMant.A2665DESCR == ''){
            win.focus('1-txtA2665DESCR');
            global.Msg({msg: 'Required Field, Description FEE'});
            return;
        }
        
        Ext.Msg.show({
            title: '.:PRAXIS:.',
            msg: 'Are you sure to insert? ',
            buttons: Ext.MessageBox.YESNO,
            scope: this,
            icon: Ext.MessageBox.QUESTION,
            modal: true,
            fn: function(btn) {
                if (btn === 'yes') {
                    this.mantenimientoEMD(this.beanMant);
                }
            }
        });
    },
    btnUpdate_clickHandler: function () {
        this.beanMant.VP_OPCION = this.actionCode;
        this.beanMant.VP_RFIC  = win.getValue('1-txtA2665RFIC').trim();
        this.beanMant.VP_RFIS  = win.getValue('1-txtA2665RFIS').trim();
        this.beanMant.A2665RFIC = this.beanMant.VP_RFIC;
        this.beanMant.A2665RFIS = this.beanMant.VP_RFIS;   
        this.beanMant.A2665EMDTP   = win.getValue('1-txtA2665EMDTP').trim();
        this.beanMant.A2665DESCR   = win.getValue('1-txtA2665DESCR').trim(); 
        this.beanMant.A2665GROUP   = win.getValue('1-txtA2665GROUP').trim();
        var txtA2665DMSTC = win.getValue('1-txtA2665DMSTC');
        if(txtA2665DMSTC.length > 0) this.beanMant.A2665DMSTC = parseFloat(txtA2665DMSTC);
        else this.beanMant.A2665DMSTC = 0.00;
        this.beanMant.A2665MDADO   = win.getValue('1-txtA2665MDADO').trim();
        var txtA2665INTNC = win.getValue('1-txtA2665INTNC');
        if(txtA2665INTNC.length > 0) this.beanMant.A2665INTNC = parseFloat(txtA2665INTNC);
        else this.beanMant.A2665INTNC = 0.00;
        this.beanMant.A2665MDAIN   = win.getValue('1-txtA2665MDAIN').trim();
        var txtA2665DMSTC2 = win.getValue('1-txtA2665DMSTC2');
        if(txtA2665DMSTC2.length > 0) this.beanMant.A2665RDMST = parseFloat(txtA2665DMSTC2);
        else this.beanMant.A2665RDMST = 0.00;
        var txtA2665INTNC2 = win.getValue('1-txtA2665INTNC2');
        if(txtA2665INTNC2.length > 0) this.beanMant.A2665RINTN = parseFloat(txtA2665INTNC2);
        else this.beanMant.A2665RINTN = 0.00;
        this.beanMant.A2665EFECT = Ext.util.Format.date(Ext.getCmp(prototype.id+'-1-txtFechaOpen').getValue(), 'Ymd');
        this.beanMant.A2665DESCO = Ext.util.Format.date(Ext.getCmp(prototype.id+'-1-txtFechaClose').getValue(), 'Ymd');
        this.beanMant.A2665CORRL = win.getValue('1-txtA2665CORRL');
        this.beanMant.A2665APLIC   = 'Y';        	             
        // call method     


        if (this.beanMant.A2665INTNC === undefined){
            this.beanMant.A2665INTNC=0.00;
        }


        if (this.beanMant.A2665DMSTC === undefined){
            this.beanMant.A2665DMSTC=0.00;
        }

        if (this.beanMant.A2665DMSTC === undefined && this.beanMant.A2665INTNC === undefined ){
            this.beanMant.A2665APLIC   = 'N'	;

        }

        if (this.beanMant.A2665DMSTC == 0 && this.beanMant.A2665INTNC == 0 ){
            this.beanMant.A2665APLIC   = 'N'	;
        }

        Ext.Msg.show({
            title: '.:PRAXIS:.',
            msg: 'Are you sure to update?',
            buttons: Ext.MessageBox.YESNO,
            scope: this,
            icon: Ext.MessageBox.QUESTION,
            modal: true,
            fn: function(btn) {
                if (btn === 'yes') {
                    this.mantenimientoEMD(this.beanMant);
                }
            }
        });
    },
    btnDelete_clickHandler: function () {
        this.beanMant.VP_OPCION = 'D';
        this.beanMant.VP_RFIC = win.getValue('1-txtA2665RFIC');
        this.beanMant.VP_RFIS = win.getValue('1-txtA2665RFIS');
        this.beanMant.A2665CORRL = win.getValue('1-txtA2665CORRL');
        
        Ext.Msg.show({
            title: '.:PRAXIS:.',
            msg: 'Are you sure to delete?',
            buttons: Ext.MessageBox.YESNO,
            scope: this,
            icon: Ext.MessageBox.QUESTION,
            modal: true,
            fn: function(btn) {
                if (btn === 'yes') {
                    this.mantenimientoEMD(this.beanMant);
                }
            }
        });
    },
    onCancelClick: function () {
        this.view.close();
    },
    //</editor-fold>
    
    execSearch: function () {
        this.beanBrow.VP_RFIC='';
        this.beanBrow.VP_RFIS='';
        if(this.cbobus ==''){
            this.beanBrow.VP_OPCION='';
        }else if(this.cbobus =='C'){
            this.beanBrow.VP_OPCION='C'
            this.beanBrow.VP_RFIC = filtroRFIC;
        }else if(this.cbobus =='R'){
            this.beanBrow.VP_OPCION='R'
            this.beanBrow.VP_RFIS = filtroRFIS;
        }
        me.search(this.beanBrow);
    },
    
    //<editor-fold defaultstate="collapsed" desc="mantenimientoEMD">
    mantenimientoEMD: function (beanMant) {
        var me1 = this;
        Ext.Ajax.request({
            url: prototype.url + '/mantenimientoEMD',
            method: 'POST',
            timeout: 60000000,
            params: {beanString: JSON.stringify(beanMant)},
            beforerequest: Ext.getCmp('DataEntryEMDCodesPricesForm').mask('Loading...'),
            success: function (response, opts) {
                console.log("B");
                Ext.getCmp('DataEntryEMDCodesPricesForm').unmask();
                var res = Ext.JSON.decode(response.responseText);
                if (res.success) {
                    if (res.SQLCODE === '0') {
                        me1.execSearch();
                        me1.view.close();
                    } else {
                        me1.afterRender();
                    }
                } else global.Msg({msg: res.sesion});
                global.clear();
            },
            failure: function (response, opts) {
                Ext.getCmp('DataEntryEMDCodesPricesForm').unmask();
                console.log('server-side failure with status code ' + response.status);
            }
        });
    },
    //</editor-fold>

});