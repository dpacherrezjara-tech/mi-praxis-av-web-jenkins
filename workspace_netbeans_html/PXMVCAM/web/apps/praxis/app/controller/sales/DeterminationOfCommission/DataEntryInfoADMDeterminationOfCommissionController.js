Ext.define('Ext.Praxis.controller.sales.DeterminationOfCommission.DataEntryInfoADMDeterminationOfCommissionController',{
    extend: 'Ext.app.ViewController',
    alias: 'controller.DataEntryInfoADMDeterminationOfCommissionController',
    // <editor-fold defaultstate="collapsed" desc="Variables Globales">
    BeanADMAccountig: {},
    DataADMAccounting: new Array(),
    BeanDatos: '',
    me: '',
    // </editor-fold>
    afterRender: function(){
        me = this;
        this.p = this.view.params;
        this.initial_llamar_adm_acm('3','','','',this.p.data.A2959PREME,'','',this.p.data.A2959PREME,'');
    },
    
    // <editor-fold defaultstate="collapsed" desc="initial_llamar_adm_acm">
    initial_llamar_adm_acm: function(option,cia,forma,serie,numbeadm,seq,cupon,preme,cnxpa) {
        this.CleanFields();
        
        this.DataADMAccounting = new Array();
        this.BeanADMAccountig.COMBOBY='0';   
        this.BeanADMAccountig.OPCIONTYPE=option;
        this.BeanADMAccountig.CIA=cia;
        this.BeanADMAccountig.FORMA=forma;
        this.BeanADMAccountig.SERIE=serie;
        this.BeanADMAccountig.NUMBERADM=numbeadm;
        this.BeanADMAccountig.SEQ=seq;
        //BeanADMAccountig.TRNCU='';//data.A2548TRNCO;
        this.BeanADMAccountig.CUPON=cupon;
        this.BeanADMAccountig.VP_PREME=preme;
        this.BeanADMAccountig.VP_CNXPA=cnxpa;
        this.BeanADMAccountig.DATEFROM='';
        this.BeanADMAccountig.DATETO='';
        this.BeanADMAccountig.COUNTRY='';
        this.BeanADMAccountig.CURRENCY='';
        this.BeanADMAccountig.CHANNEL='';
        this.BeanADMAccountig.AUTMAN='';
        this.BeanADMAccountig.STATUS='';
        this.BeanADMAccountig.COMBOCHANNEL='';
        this.BeanADMAccountig.TRNCU='';
        this.BeanADMAccountig.VP_TUORCODE='';
        this.BeanADMAccountig.VP_USER='';
        this.BeanADMAccountig.VP_TYPE='';
        this.BeanADMAccountig.VP_AREA='';
        this.SearchReportADMAcounting();
    },
    // </editor-fold>
    
    // <editor-fold defaultstate="collapsed" desc="CleanFields">
    CleanFields: function() {
        this.setValue('txtAmtAdm1', '');
        this.setValue('txtDateEmi', '');
        this.setValue('txtSource', '');
        this.setValue('txtNumberIata', '');
        this.setValue('txtName', '');
        this.setValue('txtDateTickets', '');
        this.setValue('lblEmitidoFecha', '');
        this.setValue('lblEmitidoUsuario', '');
        this.setValue('lblSentFecha', '');
        this.setValue('lblSentUsuario', '');
        Ext.getCmp(prototype.id+'-txtAmtCNXPA').setText('');
        Ext.getCmp(prototype.id+'-txtpreme').setText('');
        this.setValue('txtTickets', '');
        this.setValue('lblCTA', '');
        this.setValue('lblTarifa1', '');
        this.setValue('lblTotalFare1', '');
        this.setValue('lblTotalCargo1', '');
        this.setValue('lblComi1', '');
        this.setValue('lblTaxOnCom', '');
        this.setValue('lblTarifa2', '');
        this.setValue('lblTotalFareAgen1', '');
        this.setValue('lblTotalCargoAgen1', '');
        this.setValue('lblComiAgen1', '');
        this.setValue('lblTaxOnComAgen1', '');
        this.setValue('lblTarifa3', '');
        this.setValue('lblTotalFareDife1', '');
        this.setValue('lblTotalCargoDife1', '');
        this.setValue('lblComiDife1', '');
        this.setValue('lblTaxOnComDife1', '');
        this.setValue('lblFareArelo', '');
        this.setValue('lblCur', '');
        
        //GridRazonEmision.removeAll();
        Ext.getCmp(prototype.id+'-gridDataDetalle').getStore().removeAll();
        Ext.getCmp(prototype.id+'-gridDataTax').getStore().removeAll();
        Ext.getCmp(prototype.id+'-gvwInc').getStore().removeAll();
        
        this.setValue('lblOverAreo', '');
        this.setValue('lblOverAgent', '');
        this.setValue('lblOverDifere', '');
        this.setValue('ChargeAero', '');
        this.setValue('ChargeAgent', '');
        this.setValue('Chargediferen', '');
        this.setValue('lblTrx', '');
        this.setValue('txtAddress', '');
        this.setValue('txtPass', '');
        this.setValue('txaObserva', '');
    },
    // </editor-fold>
    
    // <editor-fold defaultstate="collapsed" desc="mostrarData">
    mostrarData: function(data) {
        Ext.getCmp(prototype.id+'-txttipo').setText('3');
        this.setValue('txtAmtAdm1', data.A2548NMEMO.trim());
        this.setValue('txtDateEmi', data.A2548FREGI.trim());
        this.setValue('txtSource', data.A2548FTE.trim()+'-'+data.A2548CANAL.trim());
        Ext.getCmp(prototype.id+'-txtAmtCNXPA').setText(data.A2548CNXPA);
        Ext.getCmp(prototype.id+'-txtSource1').setText(data.A2548FTE);
        Ext.getCmp(prototype.id+'-txtA2548FLAG').setText(data.A2548FLAG);
        Ext.getCmp(prototype.id+'-txtpreme').setText(data.A2548PREME);
        
        this.setValue('txtPass', data.A2548EMPLE.trim());
        this.setValue('txtNumberIata', data.A2548IATA.trim());
        this.setValue('txtName', data.AGENCY.trim());
        this.setValue('txtAddress', data.DIRAGENCY.trim());
        this.setValue('txtDateTickets', data.A2548FVTA.trim());
        Ext.getCmp(prototype.id+'-txtAmtPais').setText(data.A2548PAIS);
        Ext.getCmp(prototype.id+'-txtAmtTRNCU').setText(data.A2548TRNCO);
        
        this.setValue('lblEmitidoFecha', data.A2548FREGI.trim());
        this.setValue('lblEmitidoUsuario', data.A2548REGIS.trim());
        this.setValue('lblSentFecha', data.A2548FEMIT.trim());
        this.setValue('lblSentUsuario', data.A2548EMITI.trim());
        
        this.setValue('lblCTA', data.A2548CTAC.trim());
        
        this.setValue('lblTourCode', data.A2548CODIT.trim());
        this.setValue('txtCNXPA', data.A2548CNXPA.trim());
        
        Ext.getCmp(prototype.id+'-imgAsr').hide();
        Ext.getCmp(prototype.id+'-imgAsr').hide();
        Ext.getCmp(prototype.id+'-lblCodeError2').hide();
        Ext.getCmp(prototype.id+'-lblCodeError').hide();
        Ext.getCmp(prototype.id+'-lblCodeError3').hide();
        
        if (data.A2548FTE==='ARC') {
            Ext.getCmp(prototype.id+'-imgArc').show();
            Ext.getCmp(prototype.id+'-imgAsr').hide();
        }
        if (data.A2548FTE==='ASR') {
            Ext.getCmp(prototype.id+'-imgArc').hide();
            Ext.getCmp(prototype.id+'-imgAsr').show();
        }
        this.setValue('lblTrx', data.A2548TRNCO.trim());
        this.setValue('txtCupon1', data.A2548CPN.trim());
        this.setValue('txtTxt', data.A2548TRNCU.trim());
        if (data.A2548BASE==='MA') {
            Ext.getCmp(prototype.id+'-Observation').show();
            this.setValue('txaObserva', data.A2548OBSER.trim());
        } else {
            Ext.getCmp(prototype.id+'-Observation').hide();
            this.setValue('txaObserva', '');
        }
        //data.A2548CANTIDAD=undefined
        if (Number(data.A2548CANTIDAD) > 1) {
            this.setValue('txtTickets', data.A2548TIKET.trim()+' More Ticket');
        } else {
            this.setValue('txtTickets', data.A2548TIKET.trim());
        }
        this.CargarRazonEmision(data);
        this.CargarCalculosAreol(data);
        this.CargarCalculosImpuestos(data);
        //PARA CARGAR EL SEGUNDO GRID ARELONIAE
        this.setValue('lblTarifa1', Ext.util.Format.number(data.A2548TARIF, '0,000.00'));
        this.setValue('lblComi1', Ext.util.Format.number(data.A2548COMIS, '0,000.00'));
        this.setValue('lblOverAreo', Ext.util.Format.number(data.A2548SCOM, '0,000.00'));
        this.setValue('lblTotalFare1', Ext.util.Format.number(data.A2548TTAX, '0,000.00'));
        this.setValue('lblTotalCargo1', Ext.util.Format.number(data.A2548SERVI, '0,000.00'));
        this.setValue('ChargeAero', Ext.util.Format.number(data.A2548IVACS, '0,000.00'));
        this.setValue('lblTaxOnCom', Ext.util.Format.number(data.A2548TAXCM, '0,000.00'));
        //PARA CARGAR EL SEGUNDO GRID AGENCIA
        this.setValue('lblTarifa2', Ext.util.Format.number(data.A2548TARIA, '0,000.00'));
        this.setValue('lblTotalFareAgen1', Ext.util.Format.number(data.A2548TTAXA, '0,000.00'));
        this.setValue('lblTotalCargoAgen1', Ext.util.Format.number(data.A2548SERVA, '0,000.00'));
        this.setValue('ChargeAgent', Ext.util.Format.number(data.A2548IVACA, '0,000.00'));
        this.setValue('lblComiAgen1', Ext.util.Format.number(data.A2548COMIA, '0,000.00'));
        this.setValue('lblOverAgent', Ext.util.Format.number(data.A2548SCOMA, '0,000.00'));
        this.setValue('lblTaxOnComAgen1', Ext.util.Format.number(data.A2548TAXCA, '0,000.00'));
        //PARA CARGAR EL SEGUNDO GRID DIFERENCIA
        this.setValue('lblTarifa3', Ext.util.Format.number(data.A2548TARID, '0,000.00'));
        this.setValue('lblTotalFareDife1', Ext.util.Format.number(data.A2548TTAXD, '0,000.00'));
        this.setValue('lblTotalCargoDife1', Ext.util.Format.number(data.A2548SERVD, '0,000.00'));
        this.setValue('Chargediferen', Ext.util.Format.number(data.A2548IVACD, '0,000.00'));
        this.setValue('lblComiDife1', Ext.util.Format.number(data.A2548COMID, '0,000.00'));
        this.setValue('lblOverDifere', Ext.util.Format.number(data.A2548SCOMD, '0,000.00'));
        this.setValue('lblTaxOnComDife1', Ext.util.Format.number(data.A2548TAXCD, '0,000.00'));
        //PARA CARGAR EL SEGUNDO GRID A pagar a la Aerolínea
        this.setValue('lblFareArelo', Ext.util.Format.number(data.A2548NETO, '0,000.00'));
        this.setValue('lblCur', data.A2548MDA.trim());
    },
    // </editor-fold>
    
    // <editor-fold defaultstate="collapsed" desc="Botones">
    onCancelClick: function(btn){
        this.view.close();
    },
    // </editor-fold>
    
    // <editor-fold defaultstate="collapsed" desc="SearchReportADMAcounting">
    SearchReportADMAcounting: function() {
        Ext.Ajax.request({
            url: prototype.url+'/SearchReportADMAcounting',
            method: 'POST',
            timeout: 60000000,
            params: this.BeanADMAccountig,
            success: function(response, options){
                var res = Ext.JSON.decode(response.responseText);
                if (res.success) {
                    me.DataADMAccounting = res.lst_search;
                    if (me.DataADMAccounting.length > 0) {
                        var file = me.DataADMAccounting[0];
                        me.BeanDatos = file;
                        me.mostrarData(file);   
                    } else {
                        global.Msg({
                            msg: 'Data not found'
                        });
                        me.DataADMAccounting = new Array();
                    }
                } else global.Msg({ msg: res.sesion });
            },
            failure: function(response, opts) {
                console.log('server-side failure with status code '+response.status);
            }
        });
    },
    // </editor-fold>
    
    // <editor-fold defaultstate="collapsed" desc="setGridData">
    setGridDataInc: function(BeanRazonEmision) {
        var storeGridDatas = Ext.create('Ext.Praxis.store.sales.DeterminationOfCommission.GridDataInc', {
            proxy: {
                url: prototype.url+'/SearchReportADM'
            },
            listeners: {
                beforeload: function(obj) {
                    obj.proxy.extraParams = BeanRazonEmision;
                },
                load: function(obj, obj2, success, obj4, obj5) {
                    win.lblUser_toolTip("Estructura: SearchReportADM");
                    if (obj.data.length === 0) {
                        me.setValue('lblCodeError2', 'No Data Found Issue Reason.');
                        Ext.getCmp(prototype.id+'-lblCodeError2').show();
                    }
                    global.clear();
                }
            }
        });
        Ext.getCmp(prototype.id+'-gvwInc').bindStore(storeGridDatas);
    },
    setGridDataCalcuArelonia: function(BeanCalculosAreol) {
        var storeGridDatas = Ext.create('Ext.Praxis.store.sales.DeterminationOfCommission.GridDataCalcuArelonia', {
            proxy: {
                url: prototype.url+'/SearchCalcuArelonia'
            },
            listeners: {
                beforeload: function(obj) {
                    obj.proxy.extraParams = BeanCalculosAreol;
                },
                load: function(obj, obj2, success, obj4, obj5) {
                    win.lblUser_toolTip("Estructura: SearchCalcuArelonia");
                    if (obj.data.length > 0) {
                        var file = obj.data.items[0].data;
                        me.setValue('lblTourCode', file.CODIT);
                    } else {
                        me.setValue('lblCodeError', 'No Data Found Calculated Airline.');
                        Ext.getCmp(prototype.id+'-lblCodeError').show();
                    }
                    global.clear();
                }
            }
        });
        Ext.getCmp(prototype.id+'-gridDataDetalle').bindStore(storeGridDatas);
    },
    setGridDataCalcuImpuestos: function(BeanDataCalculosImpu) {
        var storeGridDatas = Ext.create('Ext.Praxis.store.sales.DeterminationOfCommission.GridDataCalcuImpuestos', {
            proxy: {
                url: prototype.url+'/SearchCalcuImpuestos'
            },
            listeners: {
                beforeload: function(obj) {
                    obj.proxy.extraParams = BeanDataCalculosImpu;
                },
                load: function(obj, obj2, success, obj4, obj5) {
                    win.lblUser_toolTip("Estructura: SearchCalcuArelonia");
                    if (obj.data.length > 0) {
                        var file = obj.data.items[0].data;
                    } else {
                        Ext.getCmp(prototype.id+'-lblCodeError3').show();
                        Ext.getCmp(prototype.id+'-PRIMERO_TAX').show();
                        Ext.getCmp(prototype.id+'-lbl_primer').hide();
                        me.setValue('lblCodeError3', 'No Data Found tax.');
                    }
                    global.clear();
                }
            }
        });
        Ext.getCmp(prototype.id+'-gridDataTax').bindStore(storeGridDatas);
    },
    // </editor-fold>
    
    CargarRazonEmision: function(data) {
        var BeanRazonEmision = {};
        BeanRazonEmision.COMBOBY='0';   
        BeanRazonEmision.OPCIONTYPE='6';
        BeanRazonEmision.NUMBERADM=data.A2548CNXPA;
        
        this.setGridDataInc(BeanRazonEmision);
    },
    CargarCalculosAreol: function(data) {
        var BeanCalculosAreol = {};
        Ext.getCmp(prototype.id+'-gridDataDetalle').getStore().removeAll();
        BeanCalculosAreol.COMBOBY='0';
        BeanCalculosAreol.OPCIONTYPE='7';
        BeanCalculosAreol.VP_CIA=data.A2548CIA;
        BeanCalculosAreol.VP_FORMA=data.A2548FORMA;
        BeanCalculosAreol.VP_SERIE=data.A2548SERIE;
        BeanCalculosAreol.NUMBERADM=data.A2548NMEMO;
        BeanCalculosAreol.VP_SEQ=data.A2548SEQ;
        BeanCalculosAreol.TRNCU=data.A2548TRNCO;
        BeanCalculosAreol.VP_CUPON=data.A2548CPN;
        BeanCalculosAreol.VP_PREME=data.A2548PREME;
        BeanCalculosAreol.VP_CNXPA=data.A2548CNXPA;
        
        this.setGridDataCalcuArelonia(BeanCalculosAreol);
    },
    CargarCalculosImpuestos: function(data) {
        var BeanDataCalculosImpu = {};
        Ext.getCmp(prototype.id+'-gridDataTax').getStore().removeAll();
        BeanDataCalculosImpu.COMBOBY='0';
        BeanDataCalculosImpu.OPCIONTYPE='8';
        BeanDataCalculosImpu.VP_CIA=data.A2548CIA;
        BeanDataCalculosImpu.VP_FORMA=data.A2548FORMA;
        BeanDataCalculosImpu.VP_SERIE=data.A2548SERIE;
        BeanDataCalculosImpu.NUMBERADM=data.A2548NMEMO;
        BeanDataCalculosImpu.VP_SEQ=data.A2548SEQ;
        BeanDataCalculosImpu.VP_CUPON=data.A2548CPN;
        BeanDataCalculosImpu.TRNCU=data.A2548TRNCO;
        BeanDataCalculosImpu.VP_PREME=data.A2548PREME;
        BeanDataCalculosImpu.VP_CNXPA=data.A2548CNXPA;
        
        this.setGridDataCalcuImpuestos(BeanDataCalculosImpu);
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
//            this.btnSearch_click();
        }
    }
    // </editor-fold>
});