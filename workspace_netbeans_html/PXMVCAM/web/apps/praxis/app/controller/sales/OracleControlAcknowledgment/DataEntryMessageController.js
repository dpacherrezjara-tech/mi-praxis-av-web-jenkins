Ext.define('Ext.Praxis.controller.sales.OracleControlAcknowledgment.DataEntryMessageController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.DataEntryMessageController',
    meEle: "",
    p: '',
    bean: {},
    modBack: '',
    fuente: '',
    strVTR: '',
    gloCcust: '',
    strVoid: '',
    listaTkts: new Array(),
    lstRest: new Array(),
    gridCpnDataAC: new Array(),
    lstAGTN: new Array(),
    A1955Filter: {},
    init: function(view) {
        meEle = this;
        this.p = view.params;
        prototype.Leg = {
            id: 'DataEntryMessage',
            url: CONTEXTPATH+'/OracleControlAcknowledgment'
        };
    },
    afterRender: function() {
        this.startDisplay();
        //console.log(this.p);
        this.loadTicketOracle(this.p.bean.A1956ARCH, this.p.bean.A1956ORACL);
    },
    startDisplay: function() {
        //Ext.getCmp(prototype.Leg.id+'-boxCpnInfo').show();        
        
        //this.modBack = back;       
        
    },
    //<editor-fold defaultstate="collapsed" desc="result">
    
    onResultLoadTicketOracle: function (res) {
        console.log(res.lstData);
        this.lstRest = res.lstData;
        if(this.lstRest.length > 0){
            Ext.getCmp(prototype.Leg.id+'-gridLeg').focus();
            var A1955Filter = this.lstRest;
            
            //Ext.getCmp(prototype.Leg.id+'-gridLeg').getStore().removeAll();
            var objRow = {};
            var objRowPar = {};
            //<editor-fold defaultstate="collapsed" desc="gridLegCTS">
            var listaRout = A1955Filter;
            this.gridCpnDataAC = new Array();
            for (var i = 0; i < listaRout.length; i++) {
                objRowPar = listaRout[i];
                objRow = {};
                objRow.RN = objRowPar.RN;
                objRow.A2160C12 = objRowPar.A2160C12;
                objRow.A2160C1 = objRowPar.A2160C1;
                objRow.A2160C2 = objRowPar.A2160C2;
                objRow.A2160C3 = objRowPar.A2160C3;
                objRow.A2160C4 = objRowPar.A2160C4;
                objRow.A2160C5 = objRowPar.A2160C5;
                objRow.A2160C6 = objRowPar.A2160C6;
                objRow.A2160C7 = objRowPar.A2160C7;
                objRow.A2160C8 = objRowPar.A2160C8;
                objRow.A2160C9 = objRowPar.A2160C9;
                objRow.A2160C10 = objRowPar.A2160C10;
                objRow.A2160C11 = objRowPar.A2160C11;
                
                this.gridCpnDataAC.push(objRow);
            }
            
            Ext.getCmp(prototype.Leg.id+'-gridLeg').bindStore(
                Ext.create("Ext.Praxis.store.flown.GridData", { data: this.gridCpnDataAC })
            );
            //</editor-fold>
            
        }
    },
    
    
    //</editor-fold>
    
    //<editor-fold defaultstate="collapsed" desc="loadTicketOracle">
    loadTicketOracle: function (A1956ARCH, A1956ORACL) {
        console.log(A1956ARCH);        
        Ext.Ajax.request({
            url: prototype.Leg.url+'/searchMessages',
            method: 'POST',
            timeout: 60000000,
            params: {A1956ARCH: A1956ARCH, A1956ORACL: A1956ORACL},
            beforerequest: Ext.getCmp('DataEntryMessage').mask('Loading...'),
            success: function (response, opts) {
                var res = Ext.JSON.decode(response.responseText);
                if (res.success) {
                    meEle.onResultLoadTicketOracle(res);
                } else global.Msg({msg: res.sesion});
                Ext.getCmp('DataEntryMessage').unmask();
            },
            failure: function (response, opts) {
                Ext.getCmp('DataEntryMessage').unmask();
                console.log('server-side failure with status code '+response.status);
            }
        });
    },
    //</editor-fold>
   
    parseStringToDate: function(fecha, separador) {
        separador = separador === null || separador === undefined ? "/" : "";
        if (fecha.length===8)
            fecha = fecha.substring(0,4)+separador+fecha.substring(4,6)+separador+fecha.substring(6,8);
        return fecha;
    }
});