Ext.define('Ext.Praxis.controller.screens.ScrAccountingAdmController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.ScrAccountingAdmController',
    meEle: "",
    p: '',
    bean: {},
    beanAccounting: {},
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
            id: 'ScrAccountingAdmForm',
            url: CONTEXTPATH+'/ScrAccountingAdm'
        };
    },
    afterRender: function() {
        this.startDisplay();
        //console.log(this.p);
        this.loadAccountigAdm(this.p.beanAccounting);
    },
    startDisplay: function() {
        Ext.getCmp(prototype.Leg.id+'-boxCpnInfo').show();        
        
        //this.modBack = back;       
        
    },
    //<editor-fold defaultstate="collapsed" desc="loadAccountig">
    loadAccountigAdm: function (beanAccounting) {
        //Ext.getCmp(prototype.id+'-gridDataAccountingAdm').el.setStyle({height: '100%'});
        var me01 = this;
        Ext.Ajax.request({
            url: prototype.url+'/loadAccountig',
            method: 'POST',
            timeout: 60000000,
            params: {beanString: JSON.stringify(beanAccounting)},
            beforerequest: Ext.getCmp('ScrAccountingAdmForm').mask('Loading...'),
            success: function (response, opts) {
                Ext.getCmp('ScrAccountingAdmForm').unmask();
                var res = Ext.JSON.decode(response.responseText);
                if (res.success) me01.onResultLoadAccountigAdm(res.lst_Accounting);
                else global.Msg({msg: "Bad Request"});
            },
            failure: function (response, opts) {
                Ext.getBody().unmask();
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
    },
    onResultLoadAccountigAdm: function (gridDataTktAccountingAC) {
         try{
                console.log(gridDataTktAccountingAC);
                var fileBean = {};
                for (var i = 0; i < gridDataTktAccountingAC.length; i++) {
                    fileBean = gridDataTktAccountingAC[i];
                    fileBean.A1530TCAMP = ""; //this.beanResultSet01.fileA1530.A1530TCAMP;
                    gridDataTktAccountingAC[i] = fileBean;
                }
                var typeRow;
                var bolHeader = false, bolRecord = false, bolTotal = false;
                for (var i = 0; i < gridDataTktAccountingAC.length; i++) {
                    typeRow = this.getTypeRow(gridDataTktAccountingAC[i]);
                    switch(typeRow){
                        case 'H':
                            if (i === 0){
                                bolHeader = true;
                                bolRecord = false;
                                bolTotal = false;
                            }else{
                                if (bolHeader || bolRecord || bolTotal){
                                    gridDataTktAccountingAC.splice(i,1);
                                    i--;
                                }else{
                                    bolHeader = true;
                                    bolRecord = false;
                                    bolTotal = false;
                                }
                            }
                            break;
                        case 'R':
                            bolHeader = false;
                            bolRecord = true;
                            bolTotal = false;
                            break;
                        case 'T':
                            if (i === 0){
                                gridDataTktAccountingAC.splice(i,1);
                                i--;
                            }else{
                                if (!bolRecord){
                                    gridDataTktAccountingAC.splice(i,1);
                                    i--;
                                    if (bolHeader || bolTotal){
                                        gridDataTktAccountingAC.splice(i,1);
                                        i--;
                                    }
                                }
                            }
                            bolHeader = false;
                            bolRecord = false;
                            bolTotal = false;
                            break;
                        default:
                    }
                    if (i === gridDataTktAccountingAC.length - 1){
                        typeRow = this.getTypeRow(gridDataTktAccountingAC[i]);
                        if (typeRow === 'H'){
                            gridDataTktAccountingAC.splice(i,1);
                            i--;
                        }
                    }
                }
                Ext.getCmp(prototype.id+'-gridDataAccountingAdm').bindStore(
                    Ext.create("Ext.Praxis.store.program.GridData", { data: gridDataTktAccountingAC })
                );
        }catch(e){
            console.log(e);
        }
    },
    getTypeRow: function (fileBean) {
        var typeRow;
	fileBean.A1716SEQ = fileBean.A1716SEQ.trim();
	fileBean.A1716MODO = fileBean.A1716MODO.trim();
	fileBean.A1716CUENT = fileBean.A1716CUENT.trim();
	if(fileBean.A1716SEQ === ''){
            typeRow = 'H';
	}else if(fileBean.A1716SEQ !== '' && fileBean.A1716SEQ !== '--------'){
            typeRow = 'R';
	}else if(fileBean.A1716MODO === 'TOTAL'){
            typeRow = 'T';
	}else{
            typeRow = '';
	}
	return typeRow;
    }
});