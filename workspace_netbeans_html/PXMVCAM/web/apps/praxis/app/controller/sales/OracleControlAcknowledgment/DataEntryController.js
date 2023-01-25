Ext.define('Ext.Praxis.controller.sales.OracleControlAcknowledgment.DataEntryController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.DataEntryController',
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
            id: 'DataEntry',
            url: CONTEXTPATH+'/OracleControlAcknowledgment'
        };
    },
    afterRender: function() {
        this.startDisplay();
        //console.log(this.p);
        this.loadTicketOracle(this.p.bean.A1955MODUL, this.p.bean.A1955ENVIO, this.p.bean.A1955ACTIO);
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
                objRow.A1956CCUST = objRowPar.A1956CCUST;
                objRow.A1956ENVIO = objRowPar.A1956ENVIO;
                objRow.A1956MODUL = objRowPar.A1956MODUL;
                objRow.A1956SEQ = objRowPar.A1956SEQ;
                objRow.A1956ARCH = objRowPar.A1956ARCH;
                objRow.A1956LOTE = objRowPar.A1956LOTE;
                objRow.A1956POLIZ = objRowPar.A1956POLIZ;
                objRow.A1956SUBTP = objRowPar.A1956SUBTP;
                objRow.A1956ARCH = objRowPar.A1956ARCH;
                objRow.A1956TRCAR = objRowPar.A1956TRCAR;
                objRow.A1956STAT = objRowPar.A1956STAT;
                objRow.A1956ORACL = objRowPar.A1956ORACL;
                objRow.A1956NMSJS = objRowPar.A1956NMSJS;
                
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
    loadTicketOracle: function (IN_MODUL, IN_ENVIO, IN_ACTIO) {
        console.log(this.p.bean.A1955FECRC);
        console.log(this.p.bean.A1955HORRC);

        Ext.getCmp(prototype.id + '-txtStatus').setValue(this.p.bean.ESTADO);
        Ext.getCmp(prototype.id + '-txtOracleID').setValue(this.p.bean.A1955ORACL);
        Ext.getCmp(prototype.id + '-txtErrorLog').setValue(this.p.bean.A1955ERRLG.trim());
        Ext.getCmp(prototype.id + '-txtAccountDate').setValue(this.p.bean.A1955FCONT);
        Ext.getCmp(prototype.id + '-txtRegDate').setValue(this.p.bean.A1955FECRC);
        Ext.getCmp(prototype.id + '-txtRegHour').setValue(this.p.bean.A1955HORRC);
        Ext.getCmp(prototype.id + '-txtComment').setValue(this.p.bean.A1955COMRC.trim());
        
        Ext.Ajax.request({
            url: prototype.Leg.url+'/searchDetail',
            method: 'POST',
            timeout: 60000000,
            params: {A1955MODUL: IN_MODUL, A1955ENVIO: IN_ENVIO, A1955ACTIO: IN_ACTIO},
            beforerequest: Ext.getCmp('DataEntry').mask('Loading...'),
            success: function (response, opts) {
                var res = Ext.JSON.decode(response.responseText);
                if (res.success) {
                    meEle.onResultLoadTicketOracle(res);
                } else global.Msg({msg: res.sesion});
                Ext.getCmp('DataEntry').unmask();
            },
            failure: function (response, opts) {
                Ext.getCmp('DataEntry').unmask();
                console.log('server-side failure with status code '+response.status);
            }
        });
    },
    //</editor-fold>
   
   
    onEditClick: function (obj, metaData, rowNum, column, obj2, rowData) {
         //alert(rowData.data.A1956NMSJS);
         if(rowData.data.A1956NMSJS!==0)
         {
            var params = {};
            console.log(rowData.data);
            
            params.bean = rowData.data;
            Ext.create('Ext.Praxis.view.sales.OracleControlAcknowledgmentForm.DataEntryMessage', {
                id: 'DataEntryMessage',
                params: params
            }).show();
            
         }
    },
   
    parseStringToDate: function(fecha, separador) {
        separador = separador === null || separador === undefined ? "/" : "";
        if (fecha.length===8)
            fecha = fecha.substring(0,4)+separador+fecha.substring(4,6)+separador+fecha.substring(6,8);
        return fecha;
    }
});