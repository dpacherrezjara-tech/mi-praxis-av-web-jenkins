Ext.define('Ext.Praxis.controller.sales.GranPlanReported.DataEntryGranPlanReportedController',{
    extend: 'Ext.app.ViewController',
    alias: 'controller.DataEntryGranPlanReportedController',
    // <editor-fold defaultstate="collapsed" desc="Variables Globales">
    searchParams: {},
    msjAlert: '',
    me: '',
    // </editor-fold>
    init: function(view) {
        me = this;
    },
    afterRender: function(){
        this.p = this.view.params;
        switch( this.p.action ){
            case 'I':
            case 'U':
                Ext.getCmp(prototype.id+'-btn-save').hide();
                Ext.getCmp(prototype.id+'-btn-update').hide();
                Ext.getCmp(prototype.id+'-btn-delete').hide();
                Ext.getCmp(prototype.id+'-btn-cancel').show();
                break;
        }
    },
    onSearchTktGpClick: function() {
        this.llenarData();
        if (this.validaRequiredFields()) {
            this.get_SQP00169();
        } else {
            var msg = this.msjAlert;
            if (msg==='') msg = 'You must enter all required fields.';
            global.Msg({
                msg: msg
            });
        }
    },
    onValidaCodIATABlur: function(field) {
        var txtA1789IATA_NEW = field.getValue();
        if (txtA1789IATA_NEW!=="") {
            this.get_ObtenerIATA();
        }
    },
    // <editor-fold defaultstate="collapsed" desc="mostrarData">
    mostrarData: function(data) {
        this.setValue('txtA1789IATANEW_00', data.A003KEY3);
        this.setValue('txtA1789IATA_NEW', data.A1530AGENT);
        this.setValue('txtA1530MDA', data.A1530MDA);
        this.setValue('txtA720FECVTA', data.A720FECVTA);
        this.setValue('txtA720PNR', data.A720PNR);
        this.setValue('txtA1789TOTAL', Ext.util.Format.number(data.A720FARERV, '0,000.00'));
        this.setValue('txtA1789TOTAL_New', Ext.util.Format.number(data.A720FARERV, '0,000.00'));
        this.setValue('txtTicketNumberCiaNew', data.A720CIA);
        this.setValue('txtTicketNumberNew', data.A720FORMA+data.A720SERIE);
        this.setValue('txtA720TFORMA', data.A720TFORMA);
        
        this.setValue('txtTicketNumberCia', $.trim(data.A720CIA));
        this.setValue('txtTicketNumber', $.trim(data.A720FORMA+data.A720SERIE));
        this.setValue('txtA1789IATA', $.trim(data.A1530AGENT));
        this.setValue('txtA1789IATA_00', $.trim(data.A003KEY3));
    },
    // </editor-fold>
    
    // <editor-fold defaultstate="collapsed" desc="llenarData">
    llenarData: function() {
        searchParams = {};
        
        // <editor-fold defaultstate="collapsed" desc="llenarData">
        var txtA720CIA = this.getValue("txtA720CIA");
        var txtA720FORMA = this.getValue("txtA720FORMA");
        var txtA720SERIE = this.getValue("txtA720SERIE");
        // </editor-fold>
        
        // <editor-fold defaultstate="collapsed" desc="asignación">
        searchParams = {
            VP_CIA: txtA720CIA,
            VP_FORMA: txtA720FORMA,
            VP_SERIE: txtA720SERIE
        };
        // </editor-fold>
    },
    // </editor-fold>
    
    // <editor-fold defaultstate="collapsed" desc="Botones">
    onCancelClick: function(){
        this.view.close();
    },
    // </editor-fold>
    
    // <editor-fold defaultstate="collapsed" desc="Ext.Ajax.request">
    // <editor-fold defaultstate="collapsed" desc="get_ObtenerIATA">
    get_ObtenerIATA: function() {
        Ext.Ajax.request({
            url: prototype.url+'/get_ObtenerIATA',
            method: 'POST',
            timeout: 60000000,
            params: {
                VP_OPTION: 'A',
                VP_PARAM: txtA1789IATA_NEW
            },
            beforerequest: Ext.getCmp(prototype.id+'-formEntry').mask('Loading...'),
            success: function(response, options){
                var res = Ext.JSON.decode(response.responseText);
                if (res.success) {
                    var lstDataVar = res.lstDataVar;
                    if (lstDataVar!==undefined) {
                        me.setValue('txtA1789IATANEW_00', lstDataVar);
                    } else {
                        me.setValue('txtA1789IATANEW_00', '');
                        global.Msg({
                            msg: 'IATA Code Not Found '
                        });
                    }
                } else {
                    global.Msg({
                        msg: res.sesion
                    });
                }
                Ext.getCmp(prototype.id+'-formEntry').unmask();
            },
            failure: function(response, opts) {
                console.log('server-side failure with status code '+response.status);
                Ext.getCmp(prototype.id+'-formEntry').unmask();
            }
        });
    },
    // </editor-fold>
    // <editor-fold defaultstate="collapsed" desc="get_SQP00169">
    get_SQP00169: function() {
        Ext.Ajax.request({
            url: prototype.url+'/get_SQP00169',
            method: 'POST',
            timeout: 60000000,
            params: searchParams,
            beforerequest: Ext.getCmp(prototype.id+'-formEntry').mask('Loading...'),
            success: function(response, options){
                var res = Ext.JSON.decode(response.responseText);
                if (res.success) {
                    var lst_tkt = res.lst_tkt;
                    if (lst_tkt.length>0) {
                        var data = lst_tkt[0];
                        me.mostrarData(data);
                    } else {
                        global.Msg({
                            msg: 'Data not found'
                        });
                    }
                } else {
                    global.Msg({
                        msg: res.sesion
                    });
                }
                Ext.getCmp(prototype.id+'-formEntry').unmask();
            },
            failure: function(response, opts) {
                console.log('server-side failure with status code '+response.status);
                Ext.getCmp(prototype.id+'-formEntry').unmask();
            }
        });
    },
    // </editor-fold>
    // </editor-fold>
    
    // <editor-fold defaultstate="collapsed" desc="validaRequiredFields">
    validaRequiredFields: function() {
        if (searchParams.VP_FORMA.length!==4) {
            this.msjAlert = 'Invalid ticket Number';
            this.focus('txtA720FORMA');
            return false;
        }
        if (searchParams.VP_SERIE.length!==6) {
            this.msjAlert = 'Invalid ticket Number';
            this.focus('txtA720SERIE');
            return false;
        }
        return true;
    },
    // </editor-fold>
    
    // <editor-fold defaultstate="collapsed" desc="Utilitarios">
    getValue: function(id) {
        return Ext.getCmp(prototype.id+'-'+id).getValue();
    },
    focus: function(id) {
        Ext.getCmp(prototype.id+'-'+id).focus();
    },
    setValue: function(id, txt) {
        Ext.getCmp(prototype.id+'-'+id).setValue(txt);
    },
    onUpperValue: function(field, newValue, oldValue){
        field.setValue(newValue.toUpperCase());
    },
    onTextKeypress: function( obj , e , eOpts){
        if ( e.getKey() === e.ENTER ){
            this.btnSearch_click();
        }
    }
    // </editor-fold>
});