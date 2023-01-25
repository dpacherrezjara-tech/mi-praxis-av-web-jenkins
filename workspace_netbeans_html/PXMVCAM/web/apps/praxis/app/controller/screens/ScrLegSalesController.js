Ext.define('Ext.Praxis.controller.screens.ScrLegSalesController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.ScrLegSalesController',
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
    SQP00250Filter: {},
    init: function(view) {
        meEle = this;
        this.p = view.params;
        prototype.Leg = {
            id: 'ScrLegSalesForm',
            url: CONTEXTPATH+'/ScrLegSales'
        };
    },
    afterRender: function() {
        this.startDisplay();
        //console.log(this.p);
        this.loadTicketLegs(this.p.bean.IN_CCUST, this.p.bean.IN_CIA, this.p.bean.IN_FORMA, this.p.bean.IN_SERIE,this.p.bean.IN_SEQROL,this.p.bean.IN_CUPON);
    },
    startDisplay: function() {
        Ext.getCmp(prototype.Leg.id+'-boxCpnInfo').show();        
        
        //this.modBack = back;       
        
    },
    //<editor-fold defaultstate="collapsed" desc="result">
    
    onResultLoadTicketLegs: function (res) {
        console.log(res.filterTKT);
        this.lstRest = res.filterTKT;
        if(this.lstRest.length > 0){
            Ext.getCmp(prototype.Leg.id+'-gridLegSales').focus();
            var SQP00250Filter = this.lstRest;
            
            //Ext.getCmp(prototype.Leg.id+'-gridLegSales').getStore().removeAll();
            var objRow = {};
            var objRowPar = {};
            //<editor-fold defaultstate="collapsed" desc="gridLegSalesCTS">
            var listaRout = SQP00250Filter;
            this.gridCpnDataAC = new Array();
            for (var i = 0; i < listaRout.length; i++) {
                objRowPar = listaRout[i];
                objRow = {};
                objRow.CCUST = objRowPar.CCUST;
                objRow.IN_TKT = objRowPar.CIA+objRowPar.FORMA+objRowPar.SERIE;
                objRow.CIA = objRowPar.CIA;
                objRow.FORMA = objRowPar.FORMA;
                objRow.SERIE = objRowPar.SERIE;
                objRow.CUPON = objRowPar.CUPON;
                objRow.SUBLEG = objRowPar.SUBLEG;
                objRow.MDAREV = objRowPar.MDAREV;
                objRow.TCAMBIO = objRowPar.TCAMBIO;
                objRow.CPNVLUN = objRowPar.CPNVLUN;
                objRow.DSCTOVLUN = objRowPar.DSCTOVLUN;
                objRow.VALCOMMN = objRowPar.VALCOMMN;
                objRow.VALOVRCOMN = objRowPar.VALOVRCOMN;
                objRow.VALYQN = objRowPar.VALYQN;
                objRow.VALQN = objRowPar.VALQN;
                objRow.MDALOC = objRowPar.MDALOC;
                objRow.LTCAMBIO = objRowPar.LTCAMBIO;
                objRow.LCPNVLU = objRowPar.LCPNVLU;
                objRow.LDSCTOVLU = objRowPar.LDSCTOVLU;
                objRow.LVALCOMM = objRowPar.LVALCOMM;
                objRow.LVALOVRCOM = objRowPar.LVALOVRCOM;
                objRow.LVALYQ = objRowPar.LVALYQ;
                objRow.LVALQ = objRowPar.LVALQ;
                objRow.MDANAC = objRowPar.MDANAC;
                objRow.NTCAMBIO = objRowPar.NTCAMBIO;
                objRow.NCPNVLU = objRowPar.NCPNVLU;
                objRow.NDSCTOVLU = objRowPar.NDSCTOVLU;
                objRow.NVALCOMM = objRowPar.NVALCOMM;
                objRow.NVALOVRCOM = objRowPar.NVALOVRCOM;
                objRow.NVALYQ = objRowPar.NVALYQ;
                objRow.NVALQ = objRowPar.NVALQ;
                objRow.FBASIS = objRowPar.FBASIS;
                objRow.NVLO = objRowPar.NVLO;
                objRow.RBD = objRowPar.RBD;
                objRow.CLASE = objRowPar.CLASE;
                objRow.STPOVER = objRowPar.STPOVER;
                objRow.ORIGEN = objRowPar.ORIGEN;
                objRow.DESTINO = objRowPar.DESTINO;
                objRow.CARRIER = objRowPar.CARRIER;
                objRow.FVLO = objRowPar.FVLO;
                objRow.GRUPO = objRowPar.GRUPO;
                objRow.IDFILE = objRowPar.IDFILE;
                objRow.CIAI = objRowPar.CIAI;
                objRow.FORSERI = objRowPar.FORSERI;
                objRow.IDNRCARR = objRowPar.IDNRCARR;
                
                this.gridCpnDataAC.push(objRow);
            }
            
            Ext.getCmp(prototype.Leg.id+'-gridLegSales').bindStore(
                Ext.create("Ext.Praxis.store.flown.GridData", { data: this.gridCpnDataAC })
            );
            //</editor-fold>
            
        }
    },
    
    
    //</editor-fold>
    
    //<editor-fold defaultstate="collapsed" desc="loadTicketLegs">
    loadTicketLegs: function (IN_CCUST, IN_CIA, IN_FORMA, IN_SERIE,IN_SEQROL,IN_CUPON) {
        console.log(IN_CCUST);
        Ext.Ajax.request({
            url: prototype.Leg.url+'/loadTicketLegsSales',
            method: 'POST',
            timeout: 60000000,
            params: {IN_CCUST: IN_CCUST, IN_CIA: IN_CIA, IN_FORMA: IN_FORMA, IN_SERIE: IN_SERIE, IN_SEQROL : IN_SEQROL, IN_CUPON: IN_CUPON},
            beforerequest: Ext.getCmp('ScrLegSalesForm').mask('Loading...'),
            success: function (response, opts) {
                var res = Ext.JSON.decode(response.responseText);
                if (res.success) {
                    meEle.onResultLoadTicketLegs(res);
                } else global.Msg({msg: res.sesion});
                Ext.getCmp('ScrLegSalesForm').unmask();
            },
            failure: function (response, opts) {
                Ext.getCmp('ScrLegSalesForm').unmask();
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