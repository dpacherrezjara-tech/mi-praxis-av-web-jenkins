Ext.define('Ext.Praxis.controller.sales.GranPlanProcessed.DataEntryGranPlanProcessedController',{
    extend: 'Ext.app.ViewController',
    alias: 'controller.DataEntryGranPlanProcessedController',
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
            case 'U':
                this.mostrarData(this.p.data);
                Ext.getCmp(prototype.id+'-btn-save').hide();
                Ext.getCmp(prototype.id+'-btn-update').show();
                Ext.getCmp(prototype.id+'-btn-delete').show();
                Ext.getCmp(prototype.id+'-btn-cancel').show();
                break;
        }
    },
    onValidaCodIATABlur: function() {
        var VP_OPTION = 'A';
        var VP_PARAM = $.trim(this.getValue('txtA1789IATA_NEW'));
        if (VP_PARAM!=='') this.get_ObtenerIATA(VP_OPTION, VP_PARAM);
    },
    get_ObtenerIATA: function(VP_OPTION, VP_PARAM) {
        Ext.Ajax.request({
            url: prototype.url+'/get_ObtenerIATA',
            method: 'POST',
            timeout: 60000000,
            params: {
                VP_OPTION: VP_OPTION,
                VP_PARAM: VP_PARAM
            },
            success: function(response, options) {
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
            },
            failure: function(response, opts) {
                console.log('server-side failure with status code '+response.status);
            }
        });
    },
    // <editor-fold defaultstate="collapsed" desc="mostrarData">
    mostrarData: function(data) {
        this.setValue('txtTicketNumberCia', $.trim(data.A1802CIA));
        this.setValue('txtTicketNumber', $.trim(data.A1802FORMA)+$.trim(data.A1802SERIE));
        this.setValue('txtA1789IATA', $.trim(data.A1802IATA));
        this.setValue('txtA1789IATA_00', $.trim(data.A003KEY3));
        this.setValue('txtA1789TOTAL', Ext.util.Format.number(data.A1802FARE, '0,000.00'));
        
        this.setValue('txtTicketNumberCiaNew', $.trim(data.A1789CIA));
        this.setValue('txtTicketNumberNew', $.trim(data.A1789FORMA)+$.trim(data.A1789SERIE));
        this.setValue('txtA1789IATA_NEW', $.trim(data.A1802IATAG));
        this.setValue('txtA1789IATANEW_00', $.trim(data.A003KEY3_GP));
        this.setValue('txtA1789TOTAL_New', Ext.util.Format.number(data.A1802TOTGP, '0,000.00'));
    },
    // </editor-fold>
    
    // <editor-fold defaultstate="collapsed" desc="llenarData">
    llenarData: function() {
        searchParams = {};
        
        // <editor-fold defaultstate="collapsed" desc="llenarData">
        var txtTicketNumberCia = this.getValue("txtTicketNumberCia");
        var txtTicketNumber = this.getValue("txtTicketNumber");
        var txtA1789IATA = this.getValue("txtA1789IATA");
        var txtTicketNumberCiaNew = this.getValue("txtTicketNumberCiaNew");
        var txtTicketNumberNew = this.getValue("txtTicketNumberNew");
        var txtA1789IATA_NEW = this.getValue("txtA1789IATA_NEW");
        var txtA1789TOTAL_New = this.getValue("txtA1789TOTAL_New").replace(",","");
        // </editor-fold>
        
        var data = this.p.data;
        // <editor-fold defaultstate="collapsed" desc="asignación">
        searchParams = {
            VP_ACTION: this.p.action,
            A1789CCUST: '139',
            A1789CIA: txtTicketNumberCia,
            A1789FORMA: txtTicketNumber.substr(0,4),
            A1789SERIE: txtTicketNumber.substr(4,6),
            A1789IATA: txtA1789IATA,
            A1789PNR: data.A1802PNR,
            VP_TICKET_NEW: txtTicketNumberCiaNew+txtTicketNumberNew,
            VP_A1789IATA_NEW: txtA1789IATA_NEW,
            VP_A1789TOTAL_NEW: txtA1789TOTAL_New,
            A1789NGPS: '',
            A1789TFORM: '',
            A1789FECVT: '',
            A1789MDA: '',
            A1789STOTA: '0.0',
            A1789TOTAL: '0.0',
            A1789NPAX: '',
            A1789SRES: ''
        };
        // </editor-fold>
    },
    // </editor-fold>
    
    // <editor-fold defaultstate="collapsed" desc="CRUD">
    onUpdateClick: function(btn) {
        var p = this.view.params;
        this.llenarData();
        if (this.validaRequiredFields()) {
            Ext.Msg.show({
                title:'.:PRAXIS:.',
                msg: 'Are you sure to update ?',
                buttons: Ext.MessageBox.YESNO,
                scope: this,
                animateTarget: btn,
                icon: Ext.MessageBox.QUESTION,
                modal: true,
                fn: function(btn){
                    if (btn === 'yes'){
                        this.view.params.action = "U";
                        this.crud();
                    }
                }
            });
        } else {
            if (this.msjAlert === '') {
                global.Msg({
                    msg: 'You must enter all required fields.',
                    fn: function() {}
                });
            } else {
                global.Msg({
                    msg: this.msjAlert
                });
            }
        }
    },
    onDeleteClick: function(btn) {
    },
    onCancelClick: function(btn){
        this.view.close();
    },
    // </editor-fold>
    
    crud: function() {
        Ext.Ajax.request({
            url: prototype.url + '/setSQP00112',
            method: 'POST',
            timeout: 60000000,
            params: searchParams,
            beforerequest: Ext.getCmp('DataEntryGranPlanPendingForm').mask('Loading...'),
            success: function(response, options) {
                var res = Ext.JSON.decode(response.responseText);
                if (res.success) {
                    var msg = res.MESSAGE;
                    var icon=1;
                    if(msg==='DUPLICATE KEY, VERIFY!'){
                        icon=2;
                    }
                    global.Msg({
                        msg: msg,
                        icon: icon,
                        fn: function() {
                            Ext.getCmp('DataEntryGranPlanPendingForm').close(),
                            Ext.getCmp(prototype.id + '-btnSearch').fireEvent('click', {});
                        }
                    });
                } else {
                    global.Msg({
                        msg: res.sesion
                    });
                }
                Ext.getCmp('DataEntryGranPlanPendingForm').unmask();
            },
            failure: function(response, opts) {
                console.log('server-side failure with status code ' + response.status);
                Ext.getCmp('DataEntryGranPlanPendingForm').unmask();
            }
        });
    },
    validaRequiredFields: function() {
        if (searchParams.VP_TICKET_NEW.length!==13) {
            this.msjAlert = "Required Field, Ticket Number valid ";
            this.focus('txtTicketNumberCiaNew');
            return false;
        }
        if (searchParams.VP_A1789IATA_NEW.length!==8) {
            this.msjAlert = "Required Field, IATA Code valid ";
            this.focus('txtA1789IATA_NEW');
            return false;
        }
        if (Number(searchParams.VP_A1789TOTAL_NEW)===0) {
            this.msjAlert = "Required Field, Amout ";
            this.focus('txtA1789TOTAL_New');
            return false;
        }
        return true;
    },
    
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