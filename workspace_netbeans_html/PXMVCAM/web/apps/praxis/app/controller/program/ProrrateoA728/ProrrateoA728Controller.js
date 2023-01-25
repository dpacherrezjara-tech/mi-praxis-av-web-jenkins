Ext.define('Ext.Praxis.controller.program.ProrrateoA728.ProrrateoA728Controller', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.ProrrateoA728Controller',
    // <editor-fold defaultstate="collapsed" desc="Variables Globales">
    me: '',
    p: {},
    strModulo: '',
    beanA728: {},
    lista: new Array(),
    // </editor-fold>
    init: function(view) {
        me = this;
        // <editor-fold defaultstate="collapsed" desc="prototype">
        prototype.id = 'ProrrateoA728Form';
        prototype.url = CONTEXTPATH+'/ProrrateoA728';
        // </editor-fold>
        this.p = Ext.urlDecode(window.location.search.substring(1));
    },
    afterRender: function () {
        this.startDisplay(this.p.strMod, this.p.nroprt);
    },
    startDisplay: function (strMod, nroprt) {
        this.strModulo = strMod;
        
        var busca = false;
        this.beanA728 = {};
        
        if (nroprt.length === 9) {
            //Nro de Prorrateo 9 dígitos
            busca = true;
            this.beanA728.A728NROPRT = nroprt;
        } else if (nroprt.length >= 14) {
            //Nro de Ticket 14 dígitos (CIA(3) + FORMASERIE(10) + CUPON(1))
            busca = true;
            this.beanA728.A728CIA = nroprt.substring(0, 3);
            this.beanA728.A728NRODOC = nroprt.substring(3, 13);
            this.beanA728.A728CUPON = nroprt.substring(13, 14);
        }
        
        if (this.beanA728 !== {} && busca) {
            this.searchProrate(this.beanA728);
        }
    },
    imgBack_clickHandler: function () {
        if (this.strModulo === 'WorkProgress') {
            history.go(-1);
            win.lblUser_toolTip("Estructura: WRF002");
        }
    },
    txtValidar_keyDownHandler: function() {
    },
    btnNucRoe_clickHandler: function () {
        global.Msg({msg: 'Under Construction'});
    },
    //<editor-fold defaultstate="collapsed" desc="searchProrate">
    searchProrate: function (beanA728) {
        Ext.Ajax.request({
            url: prototype.url + '/searchProrate',
            method: 'POST',
            timeout: 60000000,
            params: { beanString: JSON.stringify(beanA728) },
            beforerequest: Ext.getBody().mask('Loading...'),
            success: function (response, opts) {
                Ext.getBody().unmask();
                var res = Ext.JSON.decode(response.responseText);
                win.lblUser_toolTip("Estructura: A728/A005");
                me.lista = new Array();
                if (res.success) {
                    me.beanA728 = res.dataA728;
                    me.lista = res.lstSectores;
                    
                    if (me.beanA728 !== undefined && me.lista !== undefined) {
                        me.mostrarData();
                    } else {
                        global.Msg({msg: 'Data Not Found.'});
                    }
                } else global.Msg({msg: res.sesion});
            },
            failure: function (response, opts) {
                Ext.getBody().unmask();
                console.log('server-side failure with status code ' + response.status);
            }
        });
    },
    //</editor-fold>
    
    //<editor-fold defaultstate="collapsed" desc="mostrarData">
    mostrarData: function () {
        this.setValue('txtA020KEY', this.beanA728.A728NROPRT);
        this.setValue('txtTicket', this.beanA728.A728CIA + ' ' + this.beanA728.A728NRODOC + ' ' + this.beanA728.A728CUPON);
        this.setValue('txtA728AIRFAC', this.beanA728.A728AIRFAC);
        this.setValue('txtA020SUFECH', this.beanA728.A728FECFAC);
        this.setValue('txtA728FECVTA', this.beanA728.A728FECVTA);
        this.setValue('txtA728FVLO1', this.beanA728.A728FVLO1);
        this.setValue('txtA020SDATE', this.beanA728.A728FREGIS + ' - ' + this.beanA728.A728HREGIS);
        this.setValue('txtA728CTYEMI', this.beanA728.A728CTYEMI);
        this.setValue('txtA728CTYVTA', this.beanA728.A728CTYVTA);
        this.setValue('txtA728CODIT', this.beanA728.A728CODIT);
        this.setValue('txtA020USER', this.beanA728.A728REGIST);
        this.setValue('txtA728ATBP', Ext.util.Format.number(this.beanA728.A728ATBP, '0,000.00'));
        this.setValue('txtA728MDAATB', this.beanA728.A728MDAATB);
        if(this.beanA728.A728IPLUS === 'S'){
            this.setValue('cmbA728IPLUS', 'S');
	}else if(this.beanA728.A728IPLUS == 'N'){
            this.setValue('cmbA728IPLUS', 'N');
	}else {
            this.setValue('cmbA728IPLUS', '');
	}
        this.setValue('txtA728CPLUSS', Ext.util.Format.number(this.beanA728.A728CPLUSS, '0,000.00'));
	//================================================
        this.setValue('txtA728TDESC', this.beanA728.A728TDESC);
        this.setValue('txtA728PORDES', Ext.util.Format.number(this.beanA728.A728PORDES, '0,000.00'));
        this.setValue('txtA728CSOVER', Ext.util.Format.number(this.beanA728.A728CSOVER, '0,000.00'));
        this.setValue('txtA728QSOVER', Ext.util.Format.number(this.beanA728.A728QSOVER, '0,000.00'));
        this.setValue('txtA728SECDS', this.beanA728.A728SECOR + this.beanA728.A728SECDS);
        this.setValue('txtA728RUTORG', this.beanA728.A728RUTORG);
        this.setValue('txtA728FBASE1', this.beanA728.A728FBASE1);
        this.setValue('txtA728LOHO', this.beanA728.A728LOHO);
        this.setValue('txtA728RERUT', this.beanA728.A728RERUT);
        Ext.getCmp(prototype.id + '-gridData').bindStore(
            Ext.create("Ext.Praxis.store.interline.GridData", { data: this.lista })
        );
    },
    //</editor-fold>
    
    // <editor-fold defaultstate="collapsed" desc="Utilitarios">
    getValue: function(id) {
        return Ext.getCmp(prototype.id+'-'+id).getValue();
    },
    focus: function(id) {
        Ext.getCmp(prototype.id+'-'+id).focus();
    },
    setValue: function(id, txt) {
        return Ext.getCmp(prototype.id+'-'+id).setValue(txt);
    },
    onUpperValue: function(field, newValue, oldValue){
        field.setValue(newValue.toUpperCase());
    },
    onTextKeypress: function( obj , e , eOpts){
        if ( e.getKey() === e.ENTER ){
            this.imgSearch_clickHandler();
        }
    }
    // </editor-fold>
});
