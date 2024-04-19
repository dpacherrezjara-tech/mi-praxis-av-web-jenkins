Ext.define('Ext.Praxis.controller.payments.BankReconciliation.DataEntryDebitsBankReconciliationController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.DataEntryDebitsBankReconciliationController',
    // <editor-fold defaultstate="collapsed" desc="Variables Globales">
    meDe: '',
    actionCode: '',
    bean: {},
    bean_detail: {},
    bean_scan: {},
    lstA1852: {},
    lstAmounts: [],
    lstSendManual: [],
    lstBlocked: [],
    lstAdjustment: [],
    sumAmount: 0,
    sumAmountBlocked: 0,
    dataObtain: {},
    // </editor-fold>
    init: function (view) {
        meDe = this;
        this.p = this.view.params;
        this.actionCode = this.p.action;
        this.bean = this.p.beanCons;
        this.lstCard = this.p.lstCard;
        this.lstBank = this.p.lstBank;
        this.lstCountry = this.p.lstCountry;
        console.log(this.bean);
        this.lstAdjustment = [];
    },
    afterRender: function () {
        console.log(this.bean.TDOC, 'TDOC');
        
        let debitType = ''
        let callCompleteDebit = ''
        this.mostrarData();
        Ext.getCmp(prototype.id + '-btn-save').hide();
        Ext.getCmp(prototype.id + '-btn-delete').hide();
        Ext.getCmp(prototype.id + '-btn-cancel').show();
        if (this.bean.STVAL === '1' || this.bean.STVAL === '4' || this.bean.STVAL === '5') {
            if(this.bean.TDOC == 'R'){
                debitType = 'REFND'
                callCompleteDebit = 'searchBeanREFND_DETAIL'
                Ext.getCmp(prototype.id + '-tabTableDebits').getTabBar().hide();
                Ext.getCmp(prototype.id + '-tabTableDebits').setActiveTab(0)
                $('.x-tab-top:contains("Blocked")').hide()
                Ext.getCmp(prototype.id + '-panel_tab_Chgbak').disable()
                Ext.getCmp(prototype.id + '-panel_tab_Acredit').disable()
            }else if(this.bean.TDOC == 'C'){
                debitType = 'Chgbak'
                callCompleteDebit = 'searchBeanCHGBAK_DETAIL'
                Ext.getCmp(prototype.id + '-tabTableDebits').getTabBar().hide();
                Ext.getCmp(prototype.id + '-tabTableDebits').setActiveTab(1)
                $('.x-tab-top:contains("Blocked")').hide()
                Ext.getCmp(prototype.id + '-panel_tab_REFND').disable()
                Ext.getCmp(prototype.id + '-panel_tab_Acredit').disable()
            }else if(this.bean.TDOC == 'A'){
                debitType = 'Acredit'
                callCompleteDebit = 'searchBeanACREDIT_DETAIL'
                Ext.getCmp(prototype.id + '-tabTableDebits').getTabBar().hide();
                Ext.getCmp(prototype.id + '-tabTableDebits').setActiveTab(2)
                $('.x-tab-top:contains("Blocked")').hide()
                Ext.getCmp(prototype.id + '-panel_tab_REFND').disable()
                Ext.getCmp(prototype.id + '-panel_tab_Chgbak').disable()
            }
            
            
            this.onSearchCompleteDetail(debitType, callCompleteDebit);
            Ext.getCmp(prototype.id + '-btn-update').hide();
//            Ext.getCmp(prototype.id + '-btn-reverse').show();
        } 
        meDe.agregaTicket(meDe.bean);
    },
    onWindowREFND: function (){
        if (this.bean.STVAL === '3'){
            console.log('entraa aqui en REFND')
            let debitType = 'REFND'  
            let callPendingDebit = 'searchBeanDebits_SCAN_PENDING'
            this.onSearchPendingDetail(debitType,callPendingDebit );
            Ext.getCmp(prototype.id + '-txtScanPNR').setDisabled(true);
            Ext.getCmp(prototype.id + '-txtScanPNR').setValue('');
            Ext.getCmp(prototype.id + '-txtScanSAGENT').setDisabled(true);
            Ext.getCmp(prototype.id + '-txtScanSAGENT').setValue('');
            Ext.getCmp(prototype.id + '-input-txtTKTScan1').setDisabled(false);
            Ext.getCmp(prototype.id + '-txtApproval').setDisabled(false);
            Ext.getCmp(prototype.id + '-txtFromDate').setDisabled(false);
            

        }
           
    },
    onWindowNormal_REFND: function (){
        
    },
    onWindowBlocked_REFND: function (){
        
    },
    onWindowChargebak: function (){
        if (this.bean.STVAL === '3'){
            let debitType = 'Chgbak'
            let callPendingDebit = 'searchBean_SCAN_PENDING_CHGBAK'
            this.onSearchPendingDetail(debitType,callPendingDebit );
            Ext.getCmp(prototype.id + '-input-txtTKTScan1').setDisabled(true);
            Ext.getCmp(prototype.id + '-input-txtTKTScan1').setValue('');
            Ext.getCmp(prototype.id + '-txtApproval').setDisabled(true);
            Ext.getCmp(prototype.id + '-txtApproval').setValue('');
            Ext.getCmp(prototype.id + '-txtFromDate').setDisabled(true);
            Ext.getCmp(prototype.id + '-txtFromDate').setValue('');
            Ext.getCmp(prototype.id + '-txtScanSAGENT').setDisabled(true);
            Ext.getCmp(prototype.id + '-txtScanSAGENT').setValue('');
            Ext.getCmp(prototype.id + '-txtScanPNR').setDisabled(false);

        }
        
    },
    onWindowNormal_Chgbak: function (){

    },
    onWindowBlocked_Chgbak: function (){
        
    },
    onWindowAcredit: function (){
        if (this.bean.STVAL === '3'){
            let debitType = 'Acredit'
            let callPendingDebit = 'searchBean_SCAN_PENDING_ACREDIT'
            this.onSearchPendingDetail(debitType,callPendingDebit );
            Ext.getCmp(prototype.id + '-input-txtTKTScan1').setDisabled(true);
            Ext.getCmp(prototype.id + '-input-txtTKTScan1').setValue('');
            Ext.getCmp(prototype.id + '-txtFromDate').setDisabled(true);
            Ext.getCmp(prototype.id + '-txtFromDate').setValue('');
            Ext.getCmp(prototype.id + '-txtApproval').setDisabled(false);
            Ext.getCmp(prototype.id + '-txtScanPNR').setDisabled(false);
            Ext.getCmp(prototype.id + '-txtScanSAGENT').setDisabled(false);

        }
        
    },
    onWindowNormal_Acredit: function (){
        
    },
    onWindowBlocked_Acredit: function (){
        
    },
    
    addCreditCard_keyDownHandler: function () {
        let pestañaActiva = Ext.getCmp(prototype.id + '-tabTableDebits').getActiveTab().getId()
        let prefixDeb = ''
        let consultPath = ''
        if(pestañaActiva.includes('REFND')){
            console.log('add refnd')
            prefixDeb = 'REFND'
            consultPath = 'searchBeanDebits_SCAN'
        }else if(pestañaActiva.includes('Chgbak')){
            console.log('add chgbak')
            prefixDeb = 'Chgbak'
            consultPath = 'searchBeanDebits_SCAN_CHGBAK'
        }else if(pestañaActiva.includes('Acredit')){
            console.log('add acredit')
            prefixDeb = 'Acredit'
            consultPath = 'searchBeanDebits_SCAN_ACREDIT'
        }
        
         
        var fecha_a_validar = "";
        this.bean_scan.TICKET = Ext.getCmp(prototype.id + '-input-txtTKTScan1').getValue();
        this.bean_scan.CARD1 = Ext.getCmp(prototype.id + '-txtCard11').getValue();
        this.bean_scan.CARD2 = Ext.getCmp(prototype.id + '-txtCard22').getValue();
        this.bean_scan.SAUTHOC = Ext.getCmp(prototype.id + '-txtApproval').getValue();
        this.bean_scan.SDATE = (Ext.getCmp(prototype.id + '-txtFromDate').getValue() === null) ? fecha_a_validar : Ext.util.Format.date(this.getValue("txtFromDate"), 'Ymd');
        this.bean_scan.SPNR = Ext.getCmp(prototype.id + '-txtScanPNR').getValue()
        this.bean_scan.SAGENT = Ext.getCmp(prototype.id + '-txtScanSAGENT').getValue()
        // Validación: Verificar si todos los campos son vacíos
        if (
                !this.bean_scan.TICKET &&
                !this.bean_scan.CARD1 &&
                !this.bean_scan.CARD2 &&
                !this.bean_scan.SAUTHOC &&
                !this.bean_scan.SDATE &&
                !this.bean_scan.SPNR &&
                !this.bean_scan.SAGENT
                ) {
            console.log("Todos los campos son vacíos. No se realizará la solicitud Ajax.");
            global.Msg({msg: 'Fields to Scan must be filled out'});
            return;
        }

        // Obtener el componente del grid
        let gridComponentNormalon = Ext.getCmp(prototype.id + '-gridDataInfoScan_' + prefixDeb);
        let gridComponentBlockedon = Ext.getCmp(prototype.id + '-gridDataInfoScanBlocked_' + prefixDeb);
        let dataGrid = gridComponentNormalon.getStore().getData().items
        let dataGridBl = gridComponentBlockedon.getStore().getData().items
        let constructorExcluir = {}.constructor;
        let arrayConstructor = dataGrid.filter(function (elemento) {
            return elemento.constructor !== constructorExcluir;
        });

        let arrayConstructorBlocked = dataGridBl.filter(function (elemento) {
            return elemento.constructor !== constructorExcluir;
        });

        let arrayNormal = []
        let arrayBlocked = []
        if (arrayConstructor.length > 0) {
            for (let value of arrayConstructor) {
                arrayNormal.push(value.data)
            }
        }
        if (arrayConstructorBlocked.length > 0) {
            for (let value of arrayConstructorBlocked) {
                arrayBlocked.push(value.data)
            }
        }
        let listAux = {}
        let listAuxBl = {}
        console.log(arrayNormal, 'arrayNormal')
        console.log(arrayBlocked, 'arrayBlocked')
        for (let value of arrayNormal) {
            
            listAux[`${value.STVAL}#${value.descTDOC}#${value.A720AGENTE}#${value.A720FECVTA}#${value.A720PNR}#${value.A1531TKT}#${value.A1531TTARJ}#${value.A1531NREF}#${value.A1531CAPL}#${value.A1531MFOP}#${value.A1531VFOP}`] = "repetido"

        }
        for (let value of arrayBlocked) {
            listAuxBl[`${value.STVAL}#${value.descTDOC}#${value.A720AGENTE}#${value.A720FECVTA}#${value.A720PNR}#${value.A1531TKT}#${value.A1531TTARJ}#${value.A1531NREF}#${value.A1531CAPL}#${value.A1531MFOP}#${value.A1531VFOP}`] = "repetido"
        }
        
        var paramScan = {};
        
        paramScan.beanString = JSON.stringify(this.bean_scan);
        console.log(paramScan);
        Ext.Ajax.request({
            url: prototype.url + `/${consultPath}`,
            method: 'POST', 
            timeout: 60000000,
            params: paramScan,
            beforerequest: Ext.getCmp(prototype.id + '-dataEntryDebits').mask('Loading...'),
            success: function (response, opts) {
                Ext.getCmp(prototype.id + '-dataEntryDebits').unmask();
                var res = Ext.JSON.decode(response.responseText);
                console.log(res);
                if (res.success) {

                    let ticketsOcupados = [];
                    var cont = 0;


                    let lstNormal = arrayNormal.length > 0 ? arrayNormal : []
                    let lstBlocked = arrayBlocked.length > 0 ? arrayBlocked : []
                    console.log(lstNormal, 'lstNormal')


                    console.log(res.data, 'res.data')
                    for (let item of res.data) {
                        var validador = item.STVAL;
                        if (validador === '1' || validador === '5') {
                            ticketsOcupados.push(item.A1531TKT);
                            cont++;
                            if (`${item.STVAL}#${item.descTDOC}#${item.A720AGENTE}#${item.A720FECVTA}#${item.A720PNR}#${item.A1531TKT}#${item.A1531TTARJ}#${item.A1531NREF}#${item.A1531CAPL}#${item.A1531MFOP}#${item.A1531VFOP}` in listAuxBl) {
                                console.log('repetido')
                                continue
                            }
                            lstBlocked.push({
                                STVAL: item.STVAL,
                                descTDOC: item.descTDOC,
                                A720AGENTE: item.A720AGENTE,
                                A720FECVTA: item.A720FECVTA,
                                A720PNR: item.A720PNR,
                                A1531TKT: item.A1531TKT,
                                A1531TTARJ: item.A1531TTARJ,
                                A1531NREF: item.A1531NREF,
                                A1531CAPL: item.A1531CAPL,
                                A1531MFOP: item.A1531MFOP,
                                A1531VFOP: item.A1531VFOP,
                                tot_VFOP: item.tot_VFOP,
                                CFUENTE: item.CFUENTE,
                            })


                        } else {
                            
                            console.log(listAux, 'primer listAux')
                            console.log(`${item.STVAL}#${item.descTDOC}#${item.A720AGENTE}#${item.A720FECVTA}#${item.A720PNR}#${item.A1531TKT}#${item.A1531TTARJ}#${item.A1531NREF}#${item.A1531CAPL}#${item.A1531MFOP}#${item.A1531VFOP}#${item.tot_VFOP}` in listAux, 'josue no sale')
                            if (`${item.STVAL}#${item.descTDOC}#${item.A720AGENTE}#${item.A720FECVTA}#${item.A720PNR}#${item.A1531TKT}#${item.A1531TTARJ}#${item.A1531NREF}#${item.A1531CAPL}#${item.A1531MFOP}#${item.A1531VFOP}` in listAux) {
                                console.log('repetido')
                                continue
                            }

                            lstNormal.push({
                                STVAL: item.STVAL,
                                descTDOC: item.descTDOC,
                                A720AGENTE: item.A720AGENTE,
                                A720FECVTA: item.A720FECVTA,
                                A720PNR: item.A720PNR,
                                A1531TKT: item.A1531TKT,
                                A1531TTARJ: item.A1531TTARJ,
                                A1531NREF: item.A1531NREF,
                                A1531CAPL: item.A1531CAPL,
                                A1531MFOP: item.A1531MFOP,
                                A1531VFOP: item.A1531VFOP,
                                tot_VFOP: item.tot_VFOP,
                                CFUENTE: item.CFUENTE,
                            })

                            console.log(lstNormal, 'lstNormalAfterPush')
                            console.log(item, 'item')

//                            listAux[`${item.STVAL}#${item.descTDOC}#${item.A720AGENTE}#${item.A720FECVTA}#${item.A720PNR}#${item.A1531TKT}#${item.A1531TTARJ}#${item.A1531NREF}#${item.A1531CAPL}#${item.A1531MFOP}#${item.A1531VFOP}#${item.tot_VFOP}`] = "quegil"
//                            console.log(listAux, 'segundo listAux')
                        }
                    }
                    console.log(lstNormal, 'lstNormalFuera')
//                    if (cont > 0) {
//                        let mensaje = 'Blocked tickets:<br>' + ticketsOcupados.join('<br>');
//                        global.Msg({msg: mensaje});
//                        console.log(mensaje);
//                    }

                    var storeDataNormal = Ext.create('Ext.data.Store', {
                        data: lstNormal,
                        autoLoad: true
                    })
                    Ext.getCmp(prototype.id + '-gridDataInfoScan_' + prefixDeb).bindStore(storeDataNormal);

                    var storeDataBlocked = Ext.create('Ext.data.Store', {
                        data: lstBlocked,
                        autoLoad: true
                    });
                    Ext.getCmp(prototype.id + '-gridDataInfoScanBlocked_' + prefixDeb).bindStore(storeDataBlocked);

                    meDe.calcularMontos(prefixDeb);
                    meDe.avisarRegistros(prefixDeb);
                    meDe.calcularSumAmount(prefixDeb);

                } else {
                    global.Msg({msg: res.Mensaje});
                }
            },
            failure: function (response, opts) {
                console.log('server-side failure with status code ' + response.status);
                Ext.getCmp(prototype.id + '-dataEntry').unmask();
            }
        });
    },
    avisarRegistros: function (prefixDeb) {
        var Estado = Ext.getCmp(prototype.id + '-de-txtSTVALHide').getValue();
        console.log(Estado);
        if (Estado !== '1' && Estado !== '5') {
            let grilla = Ext.getCmp(prototype.id + '-gridDataInfoScan_' + prefixDeb);
            let listaDeDatos = [];
            let ticketsOcupados = [];
            var cont = 0;
            grilla.getStore().each(function (record) {
                let registro = {
                    STVAL: record.get('STVAL'), // Reemplaza 'id' con el campo correcto de tu modelo
                    PRDA: Ext.getCmp(prototype.id + '-de-txtPRDA').getValue(), // Reemplaza 'id' con el campo correcto de tu modelo
                    SCARDN: record.get('A1531NREF'), // Reemplaza 'id' con el campo correcto de tu modelo
                    SAUTHOC: record.get('A1531CAPL'), // Reemplaza 'nombre' con el campo correcto de tu modelo
                    VFOP: record.get('A1531VFOP'), // Reemplaza 'nombre' con el campo correcto de tu modelo
                    SDATE: record.get('A720FECVTA'), // Reemplaza 'nombre' con el campo correcto de tu modelo
                    TICKET: record.get('A1531TKT'), // Reemplaza 'nombre' con el campo correcto de tu modelo
                    TRANC: Ext.getCmp(prototype.id + '-de-txtTRANC').getValue() // Reemplaza 'nombre' con el campo correcto de tu modelo
                };
                if (record.get('STVAL') === '1' || record.get('STVAL') === '5') {
                    ticketsOcupados.push(record.get('A1531TKT'));
                    cont++;
                    console.log(cont);
                }

                listaDeDatos.push(registro);
            });
            if (cont > 0) {
                let mensaje = 'Blocked tickets:<br>' + ticketsOcupados.join('<br>');
                global.Msg({msg: mensaje});
                console.log(mensaje);
            }
        } else {
            //nadine
        }
    },
    obtainData: function ( prefixDeb ) {
        Ext.Ajax.request({
            url: prototype.urlMaster + '/obtainDataAdjs',
            method: 'POST',
            timeout: 60000000,
            params: {},
            //beforerequest: Ext.getCmp(prototype.id + '-dataEntryDebits').mask('Loading...'),
            success: function (response, opts) {
                //Ext.getCmp(prototype.id + '-dataEntryDebits').unmask();
                var res = Ext.JSON.decode(response.responseText);
                console.log(res);
                if (res.success) {
                    meDe.bean_detail = res.result;
                    //llenar grilla gridDataInfoScan
                    var storeData = Ext.create('Ext.data.Store', {
                        data: res.lstData,
                        autoLoad: true
                    });
                    Ext.getCmp(prototype.id + '-cmbADJTYPE_' + prefixDeb).bindStore(storeData);
                    Ext.getCmp(prototype.id + '-cmbADJTYPE_' + prefixDeb).setValue(' ');
                } else {
                    global.Msg({msg: res.Mensaje});
                }
            },
            failure: function (response, opts) {
                console.log('server-side failure with status code ' + response.status);
                Ext.getCmp(prototype.id + '-dataEntryDebits').unmask();
            }
        });
        Ext.Ajax.request({
            url: prototype.url + '/obtainMessages',
            method: 'POST',
            timeout: 60000000,
            params: {},
            success: function (response, opts) {
                var res = Ext.JSON.decode(response.responseText);
                console.log(res);
                if (res.success) {
                    meDe.bean_detail = res.result;
                    //llenar grilla gridDataInfoScan
                    var storeData = Ext.create('Ext.data.Store', {
                        data: res.data,
                        autoLoad: true
                    });
                    Ext.getCmp(prototype.id + '-cmbCOMENT').bindStore(storeData);
                    Ext.getCmp(prototype.id + '-cmbCOMENT').setValue('');
                } else {
                    global.Msg({msg: res.Mensaje});
                }
            },
            failure: function (response, opts) {
                console.log('server-side failure with status code ' + response.status);
                Ext.getCmp(prototype.id + '-dataEntryDebits').unmask();
            }
        });
        Ext.Ajax.request({
            url: prototype.url + '/obtainMessagesDT',
            method: 'POST',
            timeout: 60000000,
            params: {},
            success: function (response, opts) {
                var res = Ext.JSON.decode(response.responseText);
                console.log(res);
                if (res.success) {
                    meDe.bean_detail = res.result;
                    //llenar grilla gridDataInfoScan
                    var storeData = Ext.create('Ext.data.Store', {
                        data: res.data,
                        autoLoad: true
                    });
                    Ext.getCmp(prototype.id + '-cmbDebitType').bindStore(storeData);
                    Ext.getCmp(prototype.id + '-cmbDebitType').setValue('');
                } else {
                    global.Msg({msg: res.Mensaje});
                }
            },
            failure: function (response, opts) {
                console.log('server-side failure with status code ' + response.status);
                Ext.getCmp(prototype.id + '-dataEntryDebits').unmask();
            }
        });
    },
    onSearchCompleteDetail: function ( prefixDeb, consultPath ) {

        var paramDetail = {};
        paramDetail.beanString = JSON.stringify(this.bean);
        console.log('MUESTRA EL PARAMS ');
        console.log(paramDetail);
        Ext.Ajax.request({
            url: prototype.url + `/${consultPath}`,
            method: 'POST',
            timeout: 60000000,
            params: paramDetail,
            beforerequest: Ext.getCmp(prototype.id + '-dataEntryDebits').mask('Loading...'),
            success: function (response, opts) {
                Ext.getCmp(prototype.id + '-dataEntryDebits').unmask();
                var res = Ext.JSON.decode(response.responseText);
                console.log(res);
                if (res.success) {
                    meDe.bean_detail = res.result;
                    //llenar grilla gridDataInfoScan
                    var storeData = Ext.create('Ext.data.Store', {
                        data: res.data,
                        autoLoad: true
                    });
                    Ext.getCmp(prototype.id + '-gridDataInfoScan_' + prefixDeb).bindStore(storeData);
                    console.log('setea nuevamente')
                    meDe.calcularSumAmount(prefixDeb);
                    meDe.calcularMontos(prefixDeb);
                } else {
                    global.Msg({msg: res.Mensaje});
                }
            },
            failure: function (response, opts) {
                console.log('server-side failure with status code ' + response.status);
                Ext.getCmp(prototype.id + '-dataEntryDebits').unmask();
            }
        });
    },
    onSearchPendingDetail: function ( prefixDeb, consultPath ) {
        
        var paramDetail = {};
        
        this.bean.SCARDNSIX = this.bean.SCARDN.substring(0, 6);
        this.bean.SCARDNFOUR = this.bean.SCARDN.substring(this.bean.SCARDN.length - 4)
        console.log(this.bean.SCARDN, 'this.bean.SCARDN')
        console.log(this.bean.SCARDNSIX, 'this.bean.SCARDNSIX')
        console.log(this.bean.SCARDNFOUR, 'this.bean.SCARDNFOUR')
        paramDetail.beanString = JSON.stringify(this.bean);
        console.log(paramDetail);
        Ext.Ajax.request({
            url: prototype.url + `/${consultPath}`,
            method: 'POST',
            timeout: 60000000,
            params: paramDetail,
            beforerequest: Ext.getCmp(prototype.id + '-dataEntryDebits').mask('Loading...'),
            success: function (response, opts) {
                Ext.getCmp(prototype.id + '-dataEntryDebits').unmask();
                var res = Ext.JSON.decode(response.responseText);
                console.log(res, 'ressssssssssss');
                if (res.success) {
                    meDe.bean_detail = res.result;
                    //llenar grilla gridDataInfoScan
                    var storeData = Ext.create('Ext.data.Store', {
                        data: res.data,
                        autoLoad: true
                    });
                    Ext.getCmp(prototype.id + '-gridDataInfoScan_' + prefixDeb).bindStore(storeData);
                    meDe.calcularSumAmount(prefixDeb);
                    meDe.calcularMontos(prefixDeb);
                } else {
                    global.Msg({msg: res.Mensaje});
                }
            },
            failure: function (response, opts) {
                console.log('server-side failure with status code ' + response.status);
                Ext.getCmp(prototype.id + '-dataEntryDebits').unmask();
            }
        });
    },
    mostrarData: function () {
        console.log('-----------mostrar data----------')
        console.log(this.bean.SVFOP)
        console.log(this.bean, 'EL BEAN DEL DETAIL')
        console.log(this.bean.DEBTYPE, 'EL BEAN DEL DETAIL')
        
        let pestañaActiva = Ext.getCmp(prototype.id + '-tabTableDebits').getActiveTab().getId()
        let prefixDeb = ''
        if(pestañaActiva.includes('REFND')){
            prefixDeb = 'REFND'
        }else if(pestañaActiva.includes('Chgbak')){
            prefixDeb = 'Chgbak'
        }else if(pestañaActiva.includes('Acredit')){
            prefixDeb = 'Acredit'
        }
//        this.setValue('de-txtSDATE', meDe.bean.SDATE);
        if (this.bean.STVAL === '1' || this.bean.STVAL === '5') {
            Ext.getCmp(prototype.id + '-mostrarComment').hide();
            Ext.getCmp(prototype.id + '-labelScan').hide();
            Ext.getCmp(prototype.id + '-panelScanCard').hide();
            Ext.getCmp(prototype.id + '-panelScanCard_2').hide();
            Ext.getCmp(prototype.id + '-gridColumnDelete_REFND').hide();
            Ext.getCmp(prototype.id + '-gridColumnDelete_Chgbak').hide();
            Ext.getCmp(prototype.id + '-gridColumnDelete_Acredit').hide();
            Ext.getCmp(prototype.id + '-gridColumnAdj_REFND').hide();
            Ext.getCmp(prototype.id + '-gridColumnAdj_Chgbak').hide();
            Ext.getCmp(prototype.id + '-gridColumnAdj_Acredit' ).hide();
            Ext.getCmp(prototype.id + '-gridDataInfoScan_REFND' ).setWidth(942);
            Ext.getCmp(prototype.id + '-gridDataInfoScan_Chgbak' ).setWidth(942);
            Ext.getCmp(prototype.id + '-gridDataInfoScan_Acredit' ).setWidth(942);
            Ext.getCmp(prototype.id + '-panelDataInfoScan_REFND' ).setWidth(944);
            Ext.getCmp(prototype.id + '-panelDataInfoScan_Chgbak' ).setWidth(944);
            Ext.getCmp(prototype.id + '-panelDataInfoScan_Acredit' ).setWidth(944);
            Ext.getCmp(prototype.id + '-vacioComment').show();
            this.hiddenByMatch()
        } else {
            Ext.getCmp(prototype.id + '-mostrarComment').show();
            Ext.getCmp(prototype.id + '-cmbDebitType').show();
            Ext.getCmp(prototype.id + '-spcByDT').setWidth(1);
            Ext.getCmp(prototype.id + '-de-txtDTYPE').hide();
            Ext.getCmp(prototype.id + '-labelScan').show();
            Ext.getCmp(prototype.id + '-panelScanCard').show();
            Ext.getCmp(prototype.id + '-panelScanCard_2').show();
            Ext.getCmp(prototype.id + '-gridColumnDelete_REFND').show();
            Ext.getCmp(prototype.id + '-gridColumnDelete_Chgbak').show();
            Ext.getCmp(prototype.id + '-gridColumnDelete_Acredit').show();
            Ext.getCmp(prototype.id + '-gridColumnAdj_REFND').show();
            Ext.getCmp(prototype.id + '-gridColumnAdj_Chgbak').show();
            Ext.getCmp(prototype.id + '-gridColumnAdj_Acredit').show();
            Ext.getCmp(prototype.id + '-gridDataInfoScan_REFND').setWidth(1022);
            Ext.getCmp(prototype.id + '-gridDataInfoScan_Chgbak').setWidth(1022);
            Ext.getCmp(prototype.id + '-gridDataInfoScan_Acredit').setWidth(1022);
            Ext.getCmp(prototype.id + '-panelDataInfoScan_REFND').setWidth(1024);
            Ext.getCmp(prototype.id + '-panelDataInfoScan_Chgbak').setWidth(1024);
            Ext.getCmp(prototype.id + '-panelDataInfoScan_Acredit').setWidth(1024);
            Ext.getCmp(prototype.id + '-vacioComment').hide();
        }

        console.log(this.bean);
        this.setValue('de-txtPRDA', this.bean.PRDA);
        this.setValue('de-txtTRANC', this.bean.TRANC);
        this.setValue('de-txtSAGENT', this.bean.DESAGENT);
        this.setValue('de-txtMERCHID', this.bean.MERCHNC);
//        this.setValue('de-txtSMERCHID', this.bean.SMERCHID);
        this.setValue('de-txtIDITEMS', this.bean.IDITEMS);
        this.setValue('de-txtIDITEMT', this.bean.IDITEMT);
        this.setValue('de-txtINSTPLA', this.bean.INSTPLA);
        this.setValue('de-txtINSTPAY', this.bean.INSTPAY);
        this.setValue('de-txtINVORNBR', this.bean.INVORNBR);
        this.setValue('de-txtZONE', this.bean.ZONE);
        this.setValue('de-txtCOUNTRY', this.bean.DESC_SCOUNTRY);
        this.setValue('de-txtSTCON', this.bean.STCON);
        this.setValue('de-txtFCONT', this.bean.FCONT);
//        this.setValue('de-txtIDCON', this.bean.IDCON);
        this.setValue('de-txtIDCON', this.bean.BANDOC);
        this.setValue('de-txtCERRORHST', this.bean.CERRORHST);
        this.setValue('de-txtCERROIN', this.bean.CERROIN);
        this.setValue('de-txtDES_CERROIN', this.bean.DES_CERROIN);
        this.setValue('de-txtFLAG', this.bean.FSELEC);
        this.setValue('de-txtCERROR', this.bean.CERROR);
        this.setValue('de-txtDES_CERROR', this.bean.DES_CERROR);
        this.setValue('de-txtBSUMDATE', this.bean.SDATE);
        this.setValue('de-txtTDOC', this.bean.strPEM);
        this.setValue('de-txtSPNR', this.bean.SPNR);
//        this.setValue('de-txtISREFNBR', this.bean.ISREFNBR);
        this.setValue('de-txtBANDOC', this.bean.BANDOC);
        this.setValue('de-txtPAYDATE', this.bean.PAYDATE);
        this.setValue('de-txtSCARCODE', this.bean.SCARCOD);
        this.setValue('de-txtCODEBANK', this.bean.CODEBANK);
        this.setValue('de-txtSCARDN', this.bean.SCARDN);
        this.setValue('de-txtSAUTHOC', this.bean.SAUTHOC);
        this.setValue('de-txtSTVAL', this.bean.descSTVAL);
        this.setValue('de-txtSTVALHide', this.bean.STVAL);
        this.setValue('de-txtQTYTKT', this.bean.QTYTKT);
        this.setValue('de-txtSTVALS', this.bean.STVALS);
        this.setValue('de-txtDTYPE', this.bean.descDEBTYPE);
        this.lstAmounts = [];
        var fila1 = {};
        fila1.label1 = 'Comm. Sett.';
        fila1.amount1 = this.bean.COMMAMO;
        fila1.label2 = 'Fare Sett.';
        fila1.amount2 = this.bean.FAREO;
        fila1.label3 = 'Transact. Amount';
        fila1.amount3 = this.bean.SVFOP;
        this.setValue('de-txtSVFOPHide', this.bean.SVFOP);
        var fila2 = {};
        fila2.label1 = 'Comm. Audit';
        fila2.amount1 = this.bean.COMMAMOC;
        fila2.label2 = 'Fare Sales';
        fila2.amount2 = this.bean.FAREC;
        fila2.label3 = 'Sales Amount';
        fila2.amount3 = this.bean.SVFOPC;
        var fila3 = {};
        fila3.label1 = 'Diff. Comm.';
        fila3.amount1 = this.bean.DIFF_COMMAMO;
        fila3.label2 = 'Diff. Fare';
        fila3.amount2 = this.bean.DIFF_FARE;
        fila3.label3 = 'Diff. Amount';
        fila3.amount3 = this.bean.SVFOPD;
        var fila4 = {};
        fila4.label1 = 'ADM/ACM';
        fila4.amount1 = this.bean.DIFF_COMMAMO;
        fila4.label2 = '';
        fila4.amount2 = this.bean.COMMFAREC;
        fila4.label3 = 'Total ADM';
        fila4.amount3 = this.bean.TOTAL_ADM;
        this.lstAmounts.push(fila1);
        this.lstAmounts.push(fila2);
        this.lstAmounts.push(fila3);
        this.lstAmounts.push(fila4);
        Ext.getCmp(prototype.id + '-gridAmounts').bindStore(
                Ext.create('Ext.data.Store', {data: this.lstAmounts, autoLoad: true})
                );
        var title = 'Currency: ' + this.bean.SCURRENCY;
        Ext.getCmp(prototype.id + '-gridAmounts').setTitle('<center style="font-size:12px;">' + title + '</center>');
        this.lstAmountsExtras = [];
        var fila1EX = {};
        fila1EX.label1EX = 'IVA';
        fila1EX.amount1EX = this.bean.IVA;
        fila1EX.label2EX = 'BASEFUE';
        fila1EX.amount2EX = this.bean.BASEFUE;
        fila1EX.label3EX = 'BASICA';
        fila1EX.amount3EX = this.bean.BASICA;
        var fila2EX = {};
        fila2EX.label1EX = 'PROPINA';
        fila2EX.amount1EX = this.bean.PROPINA;
        fila2EX.label2EX = 'RTEFUE';
        fila2EX.amount2EX = this.bean.RTEFUE;
        fila2EX.label3EX = 'RTEICA';
        fila2EX.amount3EX = this.bean.RTEICA;
        var fila3EX = {};
        fila3EX.label1EX = 'COMISION';
        fila3EX.amount1EX = this.bean.COMISION;
        fila3EX.label2EX = 'RTEIVA';
        fila3EX.amount2EX = this.bean.RTEIVA;
        fila3EX.label3EX = 'NETO';
        fila3EX.amount3EX = this.bean.NETO;
        this.lstAmountsExtras.push(fila1EX);
        this.lstAmountsExtras.push(fila2EX);
        this.lstAmountsExtras.push(fila3EX);
        Ext.getCmp(prototype.id + '-gridAmountsExtras').bindStore(
                Ext.create('Ext.data.Store', {data: this.lstAmountsExtras, autoLoad: true})
                );
        var titleExtras = 'Currency: ' + this.bean.SCURRENCY;
        Ext.getCmp(prototype.id + '-gridAmountsExtras').setTitle('<center style="font-size:12px;">' + titleExtras + '</center>');
//        this.setValue('de-txtPCURRENCY', this.bean.SCURRENCY);       
//        this.setValue('de-txtTGROSAMOUN', Ext.util.Format.number(this.bean.SVFOP, '0,000.00'));
//        this.setValue('de-txtSVFOPS', Ext.util.Format.number(this.bean.SVFOP, '0,000.00'));
//        this.setValue('de-txtDIFF_AMOUNT', Ext.util.Format.number(0, '0,000.00'));
//        this.setValue('de-txtFAREO', Ext.util.Format.number(this.bean.FAREO, '0,000.00'));
//        this.setValue('de-txtFAREC', Ext.util.Format.number(this.bean.FAREC, '0,000.00'));
//        this.setValue('de-txtDIFF_FARE', Ext.util.Format.number(this.bean.DIFF_FARE, '0,000.00'));
//        this.setValue('de-txtCOMMAMOC', Ext.util.Format.number(this.bean.COMMAMOC, '0,000.00'));
//        this.setValue('de-txtCOMMAMO', Ext.util.Format.number(this.bean.COMMAMO, '0,000.00'));
//        this.setValue('de-txtDIFF_COMMAMO', Ext.util.Format.number(this.bean.DIFF_COMMAMO, '0,000.00'));



        this.setValue('de-txtdescFREGLA', this.bean.descFREGLA);
        this.setValue('de-txtDATEC', this.bean.DATEC);
        this.setValue('de-txtVOID', this.bean.VOID);
        this.setValue('de-txtFADM', this.bean.FADM);
        this.setValue('de-txtFREVERSA', this.bean.FREVERSA);
        this.setValue('de-txtFREVADM', this.bean.FREVADM);
//        this.setValue('de-txtDIFF_AMOUNT', Ext.util.Format.number(this.bean.DIFF_AMOUNT, '0,000.00'));


        this.setValue('txtUSCR', this.bean.USCR);
        this.setValue('txtFECR', this.bean.FECR);
        this.setValue('txtHOCR', this.bean.HOCR);
        this.setValue('txtUSUP', this.bean.USUP);
        this.setValue('txtFEUP', this.bean.FEUP);
        this.setValue('txtHOUP', this.bean.HOUP);
        this.obtainData(prefixDeb);
    },
    calcularMontos: function (prefixDeb) {
        this.sumAmount = 0;
        this.lstSendManual = [];
        var store_gridInfoScan = Ext.getCmp(prototype.id + '-gridDataInfoScan_'+ prefixDeb).getStore();
        for (var i = 0; i < store_gridInfoScan.data.length; i++) {
            var dataRow1 = store_gridInfoScan.data.items[i];
            this.lstSendManual.push(dataRow1.data);
            if (dataRow1.data.STMANUAL !== 'Blocked') {
                this.sumAmount = this.sumAmount + dataRow1.data.A1531VFOP; //+ dataRow1.data.SADJUST;
            }
        }

        for (var i = 0; i < this.lstAdjustment.length; i++) {
            this.sumAmount = this.sumAmount + parseFloat(this.lstAdjustment[i].A1531VFOP);
        }

        this.setValue('de-txtSumAmount', Ext.util.Format.number(this.sumAmount, '0,000.00'));
        Ext.getCmp(prototype.id + '-gridDataInfoScan_' + prefixDeb).getView().refresh();
    },
    mostrarComment: function () {

        var txtCOMENT = Ext.getCmp(prototype.id + '-PanelComments');
        // Verificar si los elementos están visibles
        var comentVisible = txtCOMENT.isVisible();
        // Si ambos elementos están visibles, ocúltalos; de lo contrario, muéstralos
        if (comentVisible) {
            txtCOMENT.hide();
        } else {
            txtCOMENT.show();
        }
    },
    mostrarDeta: function () {
        console.log('mostrarMontos');
        Ext.getCmp(prototype.id + '-PanelAmountsMain').hide();
        Ext.getCmp(prototype.id + '-PanelAmountsDeta').show();
    },
    calcularSumAmount: function ( prefixDeb ) {
        var grid = Ext.getCmp(prototype.id + '-gridDataInfoScan_' + prefixDeb); // Reemplaza 'tuGridId' con el ID de tu grilla
        var store_gridInfoScan = Ext.getCmp(prototype.id + '-gridDataInfoScan_' + prefixDeb).getStore(); // Reemplaza 'tuGridId' con el ID de tu grilla
        var groupField = 'A1531CAPL'; // Campo por el cual quieres agrupar (PNR)

        var sum = {};

        store_gridInfoScan.each(function (record) {
            var key = record.get(groupField);
            var value = record.get('A1531VFOP');
            sum[key] = (sum[key] || 0) + parseFloat(value);
        });

        console.log(sum); // Esto imprime la suma agrupada por PNR

        // Ahora actualizamos los valores en la columna tot_VFOP
        store_gridInfoScan.each(function (record) {
            var key = record.get(groupField);
            record.set('tot_VFOP', sum[key]);
        });

        grid.getView().refresh(); // Actualizar la vista de la grilla
    },
    mostrarMain: function () {
        console.log('mostrarMontos');
        Ext.getCmp(prototype.id + '-PanelAmountsMain').show();
        Ext.getCmp(prototype.id + '-PanelAmountsDeta').hide();
    },
    //<editor-fold defaultstate="collapsed" desc="llenarData">
    llenarData: function () {
        var bean = {};
        //bean.BDATEP = Ext.util.Format.date(this.getValue("de-txtBDATEP"), 'Ymd');
        bean.PRDA = Ext.getCmp(prototype.id + '-de-txtPRDA').getValue();
        bean.MERCHID = Ext.getCmp(prototype.id + '-de-txtMERCHID').getValue();
        bean.SAGENT = Ext.getCmp(prototype.id + '-de-txtSAGENT').getValue().replace(/-/g, '');
        bean.TRANC = Ext.getCmp(prototype.id + '-de-txtTRANC').getValue();
        bean.SDATE = Ext.getCmp(prototype.id + '-de-txtBSUMDATE').getValue();
        bean.SCARDN = Ext.getCmp(prototype.id + '-de-txtSCARDN').getValue();
        console.log(bean.SAGENT);
        return bean;
    },
    //</editor-fold>

    //<editor-fold defaultstate="collapsed" desc="limpiarData">
    limpiarData: function () {
        this.setValue('de-txtPRDA', '');
        this.setValue('de-txtSAGENT', '');
        this.setValue('de-txtMERCHID', '');
        this.setValue('de-txtSMERCHID', '');
        this.setValue('de-txtIDITEMS', '');
        this.setValue('de-txtIDITEMT', '');
        this.setValue('de-txtINSTPLA', '');
        this.setValue('de-txtINSTPAY', '');
        this.setValue('de-txtINVORNBR', '');
        this.setValue('de-txtZONE', '');
        this.setValue('de-txtCOUNTRY', '');
        this.setValue('de-txtSTCON', '');
        this.setValue('de-txtFCONT', '');
        this.setValue('de-txtIDCON', '');
        this.setValue('de-txtCERRORHST', '');
        this.setValue('de-txtCERROIN', '');
        this.setValue('de-txtDES_CERROIN', '');
        this.setValue('de-txtFLAG', '');
        this.setValue('de-txtCERROR', '');
        this.setValue('de-txtDES_CERROR', '');
        this.setValue('de-txtFromDateBSUMDATE', '');
        this.setValue('de-txtBSUMDATE', '');
        this.setValue('de-txtTDOC', '');
        this.setValue('de-txtSPNR', '');
        this.setValue('de-txtBANDOC', '');
        this.setValue('de-txtSCARCODE', '');
        this.setValue('de-txtCODEBANK', '');
        this.setValue('de-txtSCARDN', '');
        this.setValue('de-txtSAUTHOC', '');
        this.setValue('de-txtSTVAL', '');
        this.setValue('de-txtQTYTKT', '');
        this.setValue('de-txtPCURRENCY', '');
        this.setValue('de-txtTGROSAMOUN', '0');
        this.setValue('de-txtdescFREGLA', '');
        this.setValue('de-txtVOID', '');
        this.setValue('de-txtSVFOP', '0');
        this.setValue('de-txtFADM', '');
        this.setValue('de-txtFREVERSA', '');
        this.setValue('de-txtFREVADM', '');
        this.setValue('de-txtDIFF_AMOUNT', '0');
        this.setValue('de-txtUSCR', '');
        this.setValue('de-txtFECR', '');
        this.setValue('de-txtHOCR', '');
        this.setValue('de-txtUSUP', '');
        this.setValue('de-txtFEUP', '');
        this.setValue('de-txtHOUP', '');
    },
    clear_keyDownHandler: function () {
        this.setValue('input-txtTKTScan1', '');
        this.setValue('txtCard11', '');
        this.setValue('txtCard22', '');
        this.setValue('txtApproval', '');
        this.setValue('txtFromDate', null);
        this.setValue('txtScanPNR', null);
        this.setValue('txtScanSAGENT', null);

    },
    clear_tableNormal: function () {
        let pestañaActiva = Ext.getCmp(prototype.id + '-tabTableDebits').getActiveTab().getId()
        let prefixDeb = ''
        if(pestañaActiva.includes('REFND')){
            prefixDeb = 'REFND'
        }else if(pestañaActiva.includes('Chgbak')){
            prefixDeb = 'Chgbak'
        }else if(pestañaActiva.includes('Acredit')){
            prefixDeb = 'Acredit'
        }
        console.log('click clear')
        let storeDataClear = Ext.create('Ext.data.Store', {
            data: '',
            autoLoad: true
        });
        Ext.getCmp(prototype.id + '-gridDataInfoScan_' + prefixDeb ).bindStore(storeDataClear);

        let storeDataClearBl = Ext.create('Ext.data.Store', {
            data: '',
            autoLoad: true
        });
        Ext.getCmp(prototype.id + '-gridDataInfoScanBlocked_' + prefixDeb).bindStore(storeDataClearBl);

        let storeDataClearAdjustment = Ext.create('Ext.data.Store', {
            data: '',
            autoLoad: true
        });

        Ext.getCmp(prototype.id + '-gridDataAdjustment_' + prefixDeb).bindStore(storeDataClearAdjustment);
        this.sumAmount = 0;
        this.lstAdjustment = [];
        Ext.getCmp(prototype.id + '-gridDataAdjustment_' + prefixDeb).hide();
        Ext.getCmp(prototype.id + '-panelADJ_' + prefixDeb).hide();
    },

//</editor-fold>

// <editor-fold defaultstate="collapsed" desc="Botones">
    onSaveClick: function (btn) {
        Ext.Msg.show({
            title: '.:PRAXIS:.',
            msg: 'Are you sure to insert ?',
            buttons: Ext.MessageBox.YESNO,
            scope: this,
            icon: Ext.MessageBox.QUESTION,
            modal: true,
            fn: function (btn) {
                if (btn === 'yes') {
                    var beanTemp = {};
                    this.llenarData(beanTemp);
                    var msjResult = this.validacionInsert(beanTemp);
                    if (msjResult === '') {
                        beanTemp.option = 'I';
                        this.executeOption(beanTemp);
                    } else {
                        global.Msg({msg: msjResult});
                    }
                }
            }
        });
    },
    onUpdateClick: function (btn) {
        
        let pestañaActiva = Ext.getCmp(prototype.id + '-tabTableDebits').getActiveTab().getId()
        let prefixDeb = ''
        if(pestañaActiva.includes('REFND')){
            prefixDeb = 'REFND'
        }else if(pestañaActiva.includes('Chgbak')){
            prefixDeb = 'Chgbak'
        }else if(pestañaActiva.includes('Acredit')){
            prefixDeb = 'Acredit'
        }
        console.log('combo debtype', Ext.getCmp(prototype.id + '-cmbDebitType').getValue())
        console.log(pestañaActiva, 'idPanelActivo')
        var deci = this.preexecuteOption(prefixDeb);
        if (deci) {
            Ext.Msg.show({
                title: '.:Confirmation:.',
                msg: 'Are you sure to Update?',
                buttons: Ext.MessageBox.YESNO,
                scope: this,
//            animateTarget: btn,
                icon: Ext.MessageBox.QUESTION,
                modal: true,
                fn: function (btn) {
                    if (btn === 'yes') {
                        var beanTemp = {};
                        beanTemp = this.llenarData();
                        beanTemp.option = 'U';
                        beanTemp.beanString = JSON.stringify(meDe.bean);
                        this.executeOption(beanTemp);
                    }
                }
            });
        }
    },
    onDeleteClick: function (btn) {
        Ext.Msg.show({
            title: '.:PRAXIS:.',
            msg: 'Are you sure to delete ?',
            buttons: Ext.MessageBox.YESNO,
            scope: this,
            icon: Ext.MessageBox.QUESTION,
            modal: true,
            fn: function (btn) {
                if (btn === 'yes') {
                    var beanTemp = {};
                    beanTemp.option = 'D';
                    beanTemp.beanString = JSON.stringify(meDe.bean);
                    this.executeOption(beanTemp);
                }
            }
        });
    },
    onReverseClick: function (btn) {
        Ext.Msg.show({
            title: '.:Confirmation:.',
            msg: 'Are you sure to Reverse?',
            buttons: Ext.MessageBox.YESNO,
            scope: this,
//            animateTarget: btn,
                icon: Ext.MessageBox.QUESTION,
                modal: true,
                fn: function (btn) {
                    if (btn === 'yes') {
                        var beanTemp = {};
                        beanTemp = this.llenarData();
                        beanTemp.option = 'R';
                        beanTemp.beanString = JSON.stringify(meDe.bean);
                        this.reverseOption(beanTemp);
                    }
            }
        });
    },
    onCancelClick: function (btn) {
        this.view.close();
    },
    // </editor-fold>

    //<editor-fold defaultstate="collapsed" desc="executeOption">
    preexecuteOption: function (prefixDeb) {

        var decide = false;
        var ASVFOP = Ext.getCmp(prototype.id + '-de-txtSVFOPHide').getValue().replace(/,/g, '').replace('.00', '');
        var BSVFOP = Ext.getCmp(prototype.id + '-de-txtSumAmount').getValue().replace(/,/g, '').replace('.00', '');
        console.log(ASVFOP);
        console.log(BSVFOP);
        if (ASVFOP === BSVFOP) {
            var debitType = Ext.getCmp(prototype.id + '-cmbDebitType').getValue();
            if(!debitType || debitType == ''){
                global.Msg({msg: 'Select the type of debit "Debit Type" '});
                return false
            }
            var comment = Ext.getCmp(prototype.id + '-cmbCOMENT').getValue();
            console.log(comment);
            if (comment !== '' && comment !== null) {
                let miGrilla = Ext.getCmp(prototype.id + '-gridDataInfoScan_' + prefixDeb);
                let datos = {};
                datos = this.procesarRegistros(miGrilla);
                if (Array.isArray(datos) && datos.length === 0) {
                    // Nadine
                } else {
                    console.log('modificable');
                    decide = true;
                }
            } else {
                global.Msg({msg: 'Select the Manual Reconciliation reason "BPO Comment" '});
                Ext.getCmp(prototype.id + '-PanelComments').show();
                Ext.getCmp(prototype.id + '-COMENT_Forced').show();
            }

        } else {
            console.error('No cuadra');
            global.Msg({msg: 'The Sum Amount is not equal to the Transaction Amount Settlement.'});
        }
        return decide;
    },
    executeOption: function (beanTemp, option) {
        let pestañaActiva = Ext.getCmp(prototype.id + '-tabTableDebits').getActiveTab().getId()
        let prefixDeb = ''
        let consultPath = ''
        let filterTDOC = ''
        if(pestañaActiva.includes('REFND')){
            prefixDeb = 'REFND'
            consultPath = 'executeOption_REFND'
            filterTDOC = 'R'
        }else if(pestañaActiva.includes('Chgbak')){
            prefixDeb = 'Chgbak'
            consultPath = 'executeOption_CHGBAK'
            filterTDOC = 'C'
        }else if(pestañaActiva.includes('Acredit')){
            prefixDeb = 'Acredit'
            consultPath = 'executeOption_ACREDIT'
            filterTDOC = 'A'
        }
        console.log(prefixDeb, 'prefixDeb')
        console.log(consultPath, 'consultPath')
        let miGrilla = Ext.getCmp(prototype.id + '-gridDataInfoScan_' + prefixDeb);
        let miGrillaAdj = Ext.getCmp(prototype.id + '-gridDataAdjustment_' + prefixDeb);
        var comentVisible = miGrillaAdj.isVisible();

        let datos = {};
        if (miGrilla) {
            // Llamada a la función procesarRegistros con la grilla como parámetro
            console.error('Entró al procesar Registros');
            if (comentVisible) {
                datos = this.procesarRegistros(miGrilla, miGrillaAdj);

            } else {
                datos = this.procesarRegistros(miGrilla);
            }
            console.log('DATOS',datos);
            
//            datos = this.procesarRegistros(miGrilla);
            if (Array.isArray(datos) && datos.length === 0) {
                // Nadine
            } else {
                Ext.Ajax.request({
                    url: prototype.url + `/${consultPath}`,
                    method: 'POST',
                    timeout: 60000000,
                    params: {beanString: datos, option: option},
                    beforerequest: Ext.getCmp(prototype.id + '-dataEntryDebits').mask('Loading...'),
                    success: function (response, opts) {
                        Ext.getCmp(prototype.id + '-dataEntryDebits').unmask();
                        var res = Ext.JSON.decode(response.responseText);
                        console.log(res);
                        if (res.success) {

                            global.Msg({
                                msg: res.Mensaje,
                                icon: 1,
                                fn: function () {
                                    //exito
                                    Ext.getCmp(prototype.id + '-dataEntryDebits').close();
                                    Ext.getCmp(prototype.id + '-cmbTDOC').setValue(filterTDOC)
                                    Ext.getCmp(prototype.id + '-cmbStatus').setValue("5")
                                    Ext.getCmp(prototype.id + '-btnSearch').fireEvent('click', {});
                                }
                            });
                        } else
                            global.Msg({msg: res.sesion});
                    },
                    failure: function (response, opts) {
                        console.log('server-side failure with status code ' + response.status);
                        Ext.getCmp(prototype.id + '-dataEntryDebits').unmask();
                    }
                });
            }
        } else {
            console.error('No se pudo encontrar la grilla con el ID especificado.');
        }
    },
    reverseOption: function (beanTemp, option) {

        let miGrilla = Ext.getCmp(prototype.id + '-gridDataInfoScan');

        let datos = {};
        var cont;
        if (miGrilla) {
            // Llamada a la función procesarRegistros con la grilla como parámetro
            cont = this.desprocesarRegistros(miGrilla);
            if (cont === 0) {
                
                datos = this.desprocesarOnlyLiquidacion();
                console.log(datos);
                Ext.Ajax.request({
                    url: prototype.url + '/reverseOptionOnlyLiq',
                    method: 'POST',
                    timeout: 60000000,
                    params: {beanString: datos, option: option},
                    beforerequest: Ext.getCmp(prototype.id + '-dataEntryDebits').mask('Loading...'),
                    success: function (response, opts) {
                        Ext.getCmp(prototype.id + '-dataEntryDebits').unmask();
                        var res = Ext.JSON.decode(response.responseText);
                        console.log(res);
                        if (res.success) {

                            global.Msg({
                                msg: res.Mensaje,
                                icon: 1,
                                fn: function () {
                                    //exito
                                    Ext.getCmp(prototype.id + '-dataEntryDebits').close();
                                    Ext.getCmp(prototype.id + '-btnSearch').fireEvent('click', {});
                                }
                            });
                        } else
                            global.Msg({msg: res.sesion});
                    },
                    failure: function (response, opts) {
                        console.log('server-side failure with status code ' + response.status);
                        Ext.getCmp(prototype.id + '-dataEntryDebits').unmask();
                    }
                });

            } else {
                datos = this.desprocesarRegistros(miGrilla);
                console.log(datos);
                Ext.Ajax.request({
                    url: prototype.url + '/reverseOption',
                    method: 'POST',
                    timeout: 60000000,
                    params: {beanString: datos, option: option},
                    beforerequest: Ext.getCmp(prototype.id + '-dataEntryDebits').mask('Loading...'),
                    success: function (response, opts) {
                        Ext.getCmp(prototype.id + '-dataEntryDebits').unmask();
                        var res = Ext.JSON.decode(response.responseText);
                        console.log(res);
                        if (res.success) {

                            global.Msg({
                                msg: res.Mensaje,
                                icon: 1,
                                fn: function () {
                                    //exito
                                    Ext.getCmp(prototype.id + '-dataEntryDebits').close();
                                    Ext.getCmp(prototype.id + '-btnSearch').fireEvent('click', {});
                                }
                            });
                        } else
                            global.Msg({msg: res.sesion});
                    },
                    failure: function (response, opts) {
                        console.log('server-side failure with status code ' + response.status);
                        Ext.getCmp(prototype.id + '-dataEntryDebits').unmask();
                    }
                });
            }
        } else {
            console.error('No se pudo encontrar la grilla con el ID especificado.');
        }
    },        
    //</editor-fold>

    procesarRegistros: function (grilla, miGrillaAdj) {
        let pestañaActiva = Ext.getCmp(prototype.id + '-tabTableDebits').getActiveTab().getId()
        let prefixDeb = ''
        if(pestañaActiva.includes('REFND')){
            prefixDeb = 'REFND'
        }else if(pestañaActiva.includes('Chgbak')){
            prefixDeb = 'Chgbak'
        }else if(pestañaActiva.includes('Acredit')){
            prefixDeb = 'Acredit'
        }
        // Crear una lista para almacenar los datos
        
        let listaDeDatos = [];
        let ticketsOcupados = [];
        var cont = 0;
        // Recorrer la grilla y agregar los datos a la lista
        grilla.getStore().each(function (record) {
            let registro = {
                PRDA: Ext.getCmp(prototype.id + '-de-txtPRDA').getValue(), // Reemplaza 'id' con el campo correcto de tu modelo
                SCARDN: record.get('A1531NREF'), // Reemplaza 'id' con el campo correcto de tu modelo
                SCARDNM: Ext.getCmp(prototype.id + '-de-txtSCARDN').getValue(), // Reemplaza 'nombre' con el campo correcto de tu modelo
                SAUTHOCM: Ext.getCmp(prototype.id + '-de-txtSAUTHOC').getValue(), // Reemplaza 'nombre' con el campo correcto de tu modelo
                SAUTHOC: record.get('A1531CAPL'), // Reemplaza 'nombre' con el campo correcto de tu modelo
                VFOP: Ext.getCmp(prototype.id + '-de-txtSumAmount').getValue().replace(/,/g, ''), // Reemplaza 'nombre' con el campo correcto de tu modelo
                SDATE: record.get('A720FECVTA'), // Reemplaza 'nombre' con el campo correcto de tu modelo
                TICKET: record.get('A1531TKT'), // Reemplaza 'nombre' con el campo correcto de tu modelo
                TRANC: Ext.getCmp(prototype.id + '-de-txtTRANC').getValue(), // Reemplaza 'nombre' con el campo correcto de tu modelo
                CERROR: Ext.getCmp(prototype.id + '-cmbCOMENT').getValue(), // Reemplaza 'nombre' con el campo correcto de tu modelo
                CERROIN: Ext.getCmp(prototype.id + '-cmbADJTYPE_' + prefixDeb).getValue() ? Ext.getCmp(prototype.id + '-cmbADJTYPE_' + prefixDeb).getValue() : '', // Reemplaza 'nombre' con el campo correcto de tu modelo
                DEBTYPE: Ext.getCmp(prototype.id + '-cmbDebitType').getValue(),
                BANDOC: Ext.getCmp(prototype.id + '-de-txtBANDOC').getValue(), // Reemplaza 'nombre' con el campo correcto de tu modelo
                DATEC: Ext.getCmp(prototype.id + '-de-txtDATEC').getValue(), // Reemplaza 'nombre' con el campo correcto de tu modelo
                MPF077TRAN: record.get('MPF077TRAN') && record.get('MPF077TRAN') != '' ? record.get('MPF077TRAN') : 0,
                MPF076TRAN: record.get('MPF076TRAN') && record.get('MPF076TRAN') != '' ? record.get('MPF076TRAN') : 0,
                SPNR: record.get('A720PNR') ? record.get('A720PNR') : '',
                TDOC: 'D'

                        // Agrega más campos según sea necesario
            };
            console.log(registro, 'registro');
            if (record.get('STVAL') === '1' || record.get('STVAL') === '5') {
                ticketsOcupados.push(record.get('A1531TKT'));
                cont++;
                console.log(cont);
            }

            listaDeDatos.push(registro);
        });

        if (miGrillaAdj && miGrillaAdj.getStore) {
            miGrillaAdj.getStore().each(function (record) {
                let registro = {
                    ASTVAL: '1', // Reemplaza 'id' con el campo correcto de tu modelo
                    ATDOC: 'A', // Reemplaza 'id' con el campo correcto de tu modelo
                    ASCARCOD: record.get('A1531TTARJ'), // Reemplaza 'id' con el campo correcto de tu modelo
                    ASCARDN: record.get('A1531NREF'), // Reemplaza 'id' con el campo correcto de tu modelo
                    ASAUTHOC: record.get('A1531CAPL'), // Reemplaza 'id' con el campo correcto de tu modelo
                    ACURRENCY: record.get('A1531MFOP'), // Reemplaza 'id' con el campo correcto de tu modelo
                    AAMOUNT: record.get('A1531VFOP'), // Reemplaza 'id' con el campo correcto de tu modelo
                    ASDATE: record.get('A720FECVTA'), // Reemplaza 'id' con el campo correcto de tu modelo
                    APNR: record.get('A720PNR'), // Reemplaza 'id' con el campo correcto de tu modelo
                    ATICKET: record.get('A1531TKT'), // Reemplaza 'id' con el campo correcto de tu modelo
                    ASAGENT: record.get('A720AGENTE'), // Reemplaza 'id' con el campo correcto de tu modelo
                    ATRANC: Ext.getCmp(prototype.id + '-de-txtTRANC').getValue(),
                    ACERROR: Ext.getCmp(prototype.id + '-cmbCOMENT').getValue(),
                    ADJCODE: Ext.getCmp(prototype.id + '-cmbADJTYPE_' + prefixDeb).getValue(),
                    BANDOC: Ext.getCmp(prototype.id + '-de-txtBANDOC').getValue(),
                    CFUENTE: record.get('CFUENTE'), ///CFUENTE
                    ADATEC: Ext.getCmp(prototype.id + '-de-txtDATEC').getValue()
                };
                listaDeDatos.push(registro);
            });
        } else {
            console.error('La grilla o su tienda no están definidas correctamente.');
        }

        // Convertir la lista a JSON
        let datosEnJSON = Ext.JSON.encode(listaDeDatos);
        if (cont > 0) {
            let mensaje = 'Errror. Blocked tickets:<br>' + ticketsOcupados.join('<br>');
//            global.Msg({msg: mensaje});
            console.log(mensaje);
            return [];
        } else {
            return datosEnJSON;
        }
    },
    desprocesarRegistros: function (grilla) {
        // Crear una lista para almacenar los datos
        let listaDeDatos = [];
        // Recorrer la grilla y agregar los datos a la lista
        grilla.getStore().each(function (record) {
            let registro = {
                PRDA: Ext.getCmp(prototype.id + '-de-txtPRDA').getValue(), // Reemplaza 'id' con el campo correcto de tu modelo
                SAUTHOCM: Ext.getCmp(prototype.id + '-de-txtSAUTHOC').getValue(), // Reemplaza 'nombre' con el campo correcto de tu modelo
                SAUTHOC: record.get('A1531CAPL'), // Reemplaza 'nombre' con el campo correcto de tu modelo
                SCARDNM: Ext.getCmp(prototype.id + '-de-txtSCARDN').getValue(), // Reemplaza 'nombre' con el campo correcto de tu modelo
                SCARDN: record.get('A1531NREF'), // Reemplaza 'id' con el campo correcto de tu modelo
                VFOP: Ext.getCmp(prototype.id + '-de-txtSumAmount').getValue().replace(/,/g, ''), // Reemplaza 'nombre' con el campo correcto de tu modelo
                SDATE: record.get('A720FECVTA'), // Reemplaza 'nombre' con el campo correcto de tu modelo
                TICKET: record.get('A1531TKT'), // Reemplaza 'nombre' con el campo correcto de tu modelo
                TRANC: Ext.getCmp(prototype.id + '-de-txtTRANC').getValue(), // Reemplaza 'nombre' con el campo correcto de tu modelo
                CERROR: Ext.getCmp(prototype.id + '-cmbCOMENT').getValue(), // Reemplaza 'nombre' con el campo correcto de tu modelo
                BANDOC: Ext.getCmp(prototype.id + '-de-txtBANDOC').getValue(), // Reemplaza 'nombre' con el campo correcto de tu modelo
                DATEC: Ext.getCmp(prototype.id + '-de-txtDATEC').getValue() // Reemplaza 'nombre' con el campo correcto de tu modelo

                        // Agrega más campos según sea necesario
            };
            console.log(registro);
            listaDeDatos.push(registro);
        });

        if (listaDeDatos.length === 0) {
            console.log('SIN FILAS, UPDATE ONLY LIQUID');
            return 0;
        } else {
            // Convertir la lista a JSON
            let datosEnJSON = Ext.JSON.encode(listaDeDatos);
            console.log('Datos en JSON:', datosEnJSON); // Agregar depuración
            return datosEnJSON;
        }

    },
    desprocesarOnlyLiquidacion: function () {
        // Crear una lista para almacenar los datos
        let listaDeDatos = [];
        // Recorrer la grilla y agregar los datos a la lista

        let registro = {
            PRDA: Ext.getCmp(prototype.id + '-de-txtPRDA').getValue(), // Reemplaza 'id' con el campo correcto de tu modelo
            SAUTHOCM: Ext.getCmp(prototype.id + '-de-txtSAUTHOC').getValue(), // Reemplaza 'nombre' con el campo correcto de tu modelo
            SCARDNM: Ext.getCmp(prototype.id + '-de-txtSCARDN').getValue(), // Reemplaza 'nombre' con el campo correcto de tu modelo
            VFOP: Ext.getCmp(prototype.id + '-de-txtSumAmount').getValue().replace(/,/g, ''), // Reemplaza 'nombre' con el campo correcto de tu modelo
            SDATE: Ext.getCmp(prototype.id + '-de-txtBSUMDATE').getValue(), // Reemplaza 'nombre' con el campo correcto de tu modelo
            TRANC: Ext.getCmp(prototype.id + '-de-txtTRANC').getValue(), // Reemplaza 'nombre' con el campo correcto de tu modelo
            CERROR: Ext.getCmp(prototype.id + '-cmbCOMENT').getValue(), // Reemplaza 'nombre' con el campo correcto de tu modelo
            BANDOC: Ext.getCmp(prototype.id + '-de-txtBANDOC').getValue(), // Reemplaza 'nombre' con el campo correcto de tu modelo
            DATEC: Ext.getCmp(prototype.id + '-de-txtDATEC').getValue() // Reemplaza 'nombre' con el campo correcto de tu modelo
                    // Agrega más campos según sea necesario
        };
        console.log(registro);
        listaDeDatos.push(registro);

        // Convertir la lista a JSON
        let datosEnJSON = Ext.JSON.encode(listaDeDatos);

        return datosEnJSON;

    },
    validacionInsert: function (beanTemp) {
        var msjResult = '';
        if (this.getValue("de-txtCODDES") === '') {
            msjResult = "You must enter the required field.";
        }
        return msjResult;
    },
    validacionUpdate: function (beanTemp) {
        var msjResult = '';
        //================== VALIDACIÓN =========================================
        //=======================================================================
        //Comprobando que los campos obligatorios sean ingresados
        console.log(beanTemp.SDATE);
        console.log(beanTemp.SCOUNTRY);
        console.log(beanTemp.TDOC);
        console.log(beanTemp.CBANK);
        console.log(beanTemp.SCARCOD);
        console.log(beanTemp.IN_CARDN1);
        console.log(beanTemp.IN_CARDN2);
        console.log(beanTemp.SAUTHOC);
        console.log(beanTemp.SVFOP);
        console.log(beanTemp.SCURRENCY);
        console.log(beanTemp.SEQNUM);
        console.log(beanTemp.MERCHN);
        console.log(beanTemp.TDATE);
        console.log(beanTemp.BDATEP);
        if (beanTemp.SDATE !== '' && beanTemp.SCOUNTRY !== ''
                && beanTemp.TDOC !== '' && beanTemp.CBANK !== ''
                && beanTemp.SCARCOD !== '' && beanTemp.IN_CARDN1 !== ''
                && beanTemp.IN_CARDN2 !== '' && beanTemp.SAUTHOC !== ''
                && beanTemp.SVFOP > 0 && beanTemp.SCURRENCY !== ''
                && beanTemp.SEQNUM !== '' && beanTemp.MERCHN !== ''
                && beanTemp.TDATE !== '' && beanTemp.BDATEP !== '') {
            if (Ext.getCmp(prototype.id + '-de-txtSAGENT').getErrors().length > 0) {
                msjResult = 'Invalid Agent Code.';
            } else if (Ext.getCmp(prototype.id + '-de-txtSAUTHOC').getErrors().length > 0) {
                msjResult = 'Invalid Authorization Code.';
            } else if (Ext.getCmp(prototype.id + '-de-txtSVFOP').getErrors().length > 0) {
                msjResult = 'Invalid Local Amount.';
            } else if (Ext.getCmp(prototype.id + '-de-txtSCURRENCY').getErrors().length > 0) {
                msjResult = 'Invalid Currency.';
            }
//            else if (Ext.getCmp(prototype.id + '-de-txtSDATE').getErrors().length > 0) {
//                msjResult = 'Invalid Sales Date.';
//            }
            else if (Ext.getCmp(prototype.id + '-de-txtLDATE').getErrors().length > 0) {
                msjResult = 'Invalid Load Date.';
            } else if (Ext.getCmp(prototype.id + '-de-txtTDATE').getErrors().length > 0) {
                msjResult = 'Invalid Transaction Date.';
            } else if (Ext.getCmp(prototype.id + '-de-txtDATEF').getErrors().length > 0) {
                msjResult = 'Invalid TEF Date.';
            } else if (Ext.getCmp(prototype.id + '-de-txtBDATEP').getErrors().length > 0) {
                msjResult = 'Invalid Process Date.';
            } else if (Ext.getCmp(prototype.id + '-de-txtQTYTKT').getErrors().length > 0) {
                msjResult = 'Invalid Quantity Tickets.';
            } else if (Ext.getCmp(prototype.id + '-de-txtSEQNUM').getErrors().length > 0) {
                msjResult = 'Invalid Sequence Number.';
            } else if (Ext.getCmp(prototype.id + '-de-txtMERCHN').getErrors().length > 0) {
                msjResult = 'Invalid Merchant Number.';
            } else if (Ext.getCmp(prototype.id + '-de-cmbSCARCOD').getErrors().length > 0) {
                msjResult = 'Invalid Card Code.';
            }
        } else {
            msjResult = 'You must enter all required fields.';
        }
        return msjResult;
    },
    deshabilitarCampos1: function () {
//        Ext.getCmp(prototype.id + '-de-txtSDATE').setReadOnly(true);
//        Ext.getCmp(prototype.id + '-de-cmbTDOC').disable(true);
        Ext.getCmp(prototype.id + '-de-cmbCODEBANK').disable(true);
        Ext.getCmp(prototype.id + '-de-cmbSCOUNTRY').disable(true);
        Ext.getCmp(prototype.id + '-de-cmbSCARCOD').disable(true);
        Ext.getCmp(prototype.id + '-de-txtSAUTHOC').setReadOnly(true);
        Ext.getCmp(prototype.id + '-de-txtPNR').setReadOnly(true);
        Ext.getCmp(prototype.id + '-de-txtCard1').setReadOnly(true);
        Ext.getCmp(prototype.id + '-de-txtCard2').setReadOnly(true);
        Ext.getCmp(prototype.id + '-de-txtSVFOP').setReadOnly(true);
        Ext.getCmp(prototype.id + '-de-txtSCURRENCY').setReadOnly(true);
        Ext.getCmp(prototype.id + '-de-txtSEQNUM').setReadOnly(true);
        Ext.getCmp(prototype.id + '-de-txtMERCHN').setReadOnly(true);
        Ext.getCmp(prototype.id + '-de-cmbTRNXCODE').disable(true);
        Ext.getCmp(prototype.id + '-de-cmbBSTVAL').disable(true);
        Ext.getCmp(prototype.id + '-de-cmbTIPOTAR').disable(true);
        Ext.getCmp(prototype.id + '-de-cmbPEM').disable(true);
        Ext.getCmp(prototype.id + '-de-txtSAGENT').setReadOnly(true);
        Ext.getCmp(prototype.id + '-de-cmbFLOAD').disable(true);
        Ext.getCmp(prototype.id + '-de-txtLDATE').setReadOnly(true);
        Ext.getCmp(prototype.id + '-de-txtREASONREJ').setReadOnly(true);
        Ext.getCmp(prototype.id + '-de-txtDESREJ').setReadOnly(true);
        Ext.getCmp(prototype.id + '-de-txtTDATE').setReadOnly(true);
        Ext.getCmp(prototype.id + '-de-txtDATEF').setReadOnly(true);
        Ext.getCmp(prototype.id + '-de-cmbSORIG').disable(true);
        Ext.getCmp(prototype.id + '-de-txtBDATEP').setReadOnly(true);
        Ext.getCmp(prototype.id + '-de-txtQTYTKT').setReadOnly(true);
        Ext.getCmp(prototype.id + '-de-txtBAID').setReadOnly(true);
        Ext.getCmp(prototype.id + '-de-txtComment').setReadOnly(true);
        Ext.getCmp(prototype.id + '-de-chkFADYEN').disable(true);
    },
    habilitarCampos1: function () {
//        Ext.getCmp(prototype.id + '-de-txtSDATE').setReadOnly(false);
//        Ext.getCmp(prototype.id + '-de-cmbTDOC').disable(false);
//        Ext.getCmp(prototype.id + '-de-cmbCODEBANK').disable(false);
//        Ext.getCmp(prototype.id + '-de-cmbSCOUNTRY').disable(false);
//        Ext.getCmp(prototype.id + '-de-cmbSCARCOD').disable(false);
        Ext.getCmp(prototype.id + '-de-txtSAUTHOC').setReadOnly(false);
        Ext.getCmp(prototype.id + '-de-txtPNR').setReadOnly(false);
        Ext.getCmp(prototype.id + '-de-txtCard1').setReadOnly(false);
        Ext.getCmp(prototype.id + '-de-txtCard2').setReadOnly(false);
        Ext.getCmp(prototype.id + '-de-txtSVFOP').setReadOnly(false);
        Ext.getCmp(prototype.id + '-de-txtSCURRENCY').setReadOnly(false);
        Ext.getCmp(prototype.id + '-de-txtSEQNUM').setReadOnly(false);
        Ext.getCmp(prototype.id + '-de-txtMERCHN').setReadOnly(false);
//        Ext.getCmp(prototype.id + '-de-cmbTRNXCODE').disable(false);
//        Ext.getCmp(prototype.id + '-de-cmbBSTVAL').disable(false);
//        Ext.getCmp(prototype.id + '-de-cmbTIPOTAR').disable(false);
//        Ext.getCmp(prototype.id + '-de-cmbPEM').disable(false);
        Ext.getCmp(prototype.id + '-de-txtSAGENT').setReadOnly(false);
//        Ext.getCmp(prototype.id + '-de-cmbFLOAD').disable(false);
        Ext.getCmp(prototype.id + '-de-txtLDATE').setReadOnly(false);
        Ext.getCmp(prototype.id + '-de-txtREASONREJ').setReadOnly(false);
        Ext.getCmp(prototype.id + '-de-txtDESREJ').setReadOnly(false);
        Ext.getCmp(prototype.id + '-de-txtTDATE').setReadOnly(false);
        Ext.getCmp(prototype.id + '-de-txtDATEF').setReadOnly(false);
//        Ext.getCmp(prototype.id + '-de-cmbSORIG').disable(false);
        Ext.getCmp(prototype.id + '-de-txtBDATEP').setReadOnly(false);
        Ext.getCmp(prototype.id + '-de-txtQTYTKT').setReadOnly(false);
        Ext.getCmp(prototype.id + '-de-txtBAID').setReadOnly(false);
        Ext.getCmp(prototype.id + '-de-txtComment').setReadOnly(false);
//        Ext.getCmp(prototype.id + '-de-chkFADYEN').disable(false);

    },
    onGridData_VIEWTKT_clickHandler: function (column, e, row, column, x, rowData) {
        Ext.getCmp(prototype.id + '-dataEntryDebits').close();
        var data = x.record.data;
        var strTkt = data.A1531TKT;
        var beanProMasterTicket = {};
//        
        beanProMasterTicket.IN_CIA = strTkt.substr(0, 3);
        beanProMasterTicket.IN_FORMA = strTkt.substr(3, 4);
        beanProMasterTicket.IN_SERIE = strTkt.substr(7, 6);
        beanProMasterTicket.IN_SEQ = '00';
//        console.log(beanProMasterTicket);
        prototypeProgram.view = 'payments-bank-reconciliation-form';
        prototypeProgram.nprog = 'PX00000269';
        prototypeProgram.title = 'Bank Reconciliation';
        prototypeProgram.modulo = '';
        win.displayCustomViewTicket(this, 'BankConciliation', beanProMasterTicket);
    },
    onGridDataViewTktFinal: function (column, e, row, column, x, rowData) {
        Ext.getCmp(prototype.id + '-dataEntryDebits').close();
        var data = x.record.data;
        var strTkt = data.A1531TKT;
        var beanProMasterTicket = {};
//        
        beanProMasterTicket.IN_CIA = strTkt.substr(0, 3);
        beanProMasterTicket.IN_FORMA = strTkt.substr(3, 4);
        beanProMasterTicket.IN_SERIE = strTkt.substr(7, 6);
        beanProMasterTicket.IN_SEQ = '00';
//        console.log(beanProMasterTicket);
        prototypeProgram.view = 'payments-bank-reconciliation-form';
        prototypeProgram.nprog = 'PX00000269';
        prototypeProgram.title = 'Bank Reconciliation';
        prototypeProgram.modulo = '';
        win.displayProMasterTicket(this, 'BankConciliation', beanProMasterTicket);
    },

    removeTKT_REFND: function (grid, rowIndex, colIndex) {
        let prefixDeb = 'REFND'
        var store_gridInfoScan = Ext.getCmp(prototype.id + '-gridDataInfoScan_REFND').getStore();
        //var rowIndex = store_gridInfoScan.indexOf(record);
        store_gridInfoScan.removeAt(rowIndex);
        Ext.getCmp(prototype.id + '-gridDataInfoScan_REFND').getView().refresh();
        this.calcularSumAmount(prefixDeb);
        this.calcularMontos(prefixDeb);
    },
    
    removeTKT_Chgbak: function (grid, rowIndex, colIndex) {
        let prefixDeb = 'Chgbak'
        var store_gridInfoScan = Ext.getCmp(prototype.id + '-gridDataInfoScan_Chgbak').getStore();
        //var rowIndex = store_gridInfoScan.indexOf(record);
        store_gridInfoScan.removeAt(rowIndex);
        Ext.getCmp(prototype.id + '-gridDataInfoScan_Chgbak').getView().refresh();
        this.calcularSumAmount(prefixDeb);
        this.calcularMontos(prefixDeb);
    },
    removeTKT_Acredit: function (grid, rowIndex, colIndex) {
        let prefixDeb = 'Acredit'
        var store_gridInfoScan = Ext.getCmp(prototype.id + '-gridDataInfoScan_Acredit').getStore();
        //var rowIndex = store_gridInfoScan.indexOf(record);
        store_gridInfoScan.removeAt(rowIndex);
        Ext.getCmp(prototype.id + '-gridDataInfoScan_Acredit').getView().refresh();
        this.calcularSumAmount(prefixDeb);
        this.calcularMontos(prefixDeb);
    },
    onAdjust_REFND: function (grid, rowIndex, colIndex) {
        let prefixDeb = 'REFND'
        var data = grid.getStore().getAt(rowIndex).data;
        console.log(data);
        console.log(this.sumAmount);
        console.log(this.bean.SVFOP);
        if (data.STMANUAL !== 'Blocked') {
            if (this.sumAmount === this.bean.SVFOP) {
                global.Msg({msg: 'The sum amount is equal to transaction amount.'});
            } else {
                //this.lstAdjustment = [];
                Ext.getCmp(prototype.id + '-gridDataAdjustment_REFND').show();
                Ext.getCmp(prototype.id + '-panelADJ_REFND').show();
                var rec = Object.create(grid.getStore().getAt(rowIndex).data);
                var monto_ajustado = parseFloat(parseFloat(this.bean.SVFOP - this.sumAmount).toFixed(2))

                rec.A1531VFOP = monto_ajustado;
                rec.tot_VFOP = monto_ajustado;
                //rec.SADJUST = 0;
//                rec.A720AGENTE = $('#menuUser').text();
//                rec.CERROR = '01';
                this.lstAdjustment.push(rec);
                Ext.getCmp(prototype.id + '-gridDataAdjustment_REFND').bindStore(
                        Ext.create('Ext.data.Store', {data: this.lstAdjustment, autoLoad: true})
                        );
                this.calcularSumAmount(prefixDeb);
                this.calcularMontos(prefixDeb);
            }
        } else {
            global.Msg({msg: 'Can\'t adjust a blocked ticket.'});
        }

    },
    onAdjust_Chgbak: function (grid, rowIndex, colIndex) {
        let prefixDeb = 'Chgbak'
        var data = grid.getStore().getAt(rowIndex).data;
        console.log(data);
        console.log(this.sumAmount);
        console.log(this.bean.SVFOP);
        if (data.STMANUAL !== 'Blocked') {
            if (this.sumAmount === this.bean.SVFOP) {
                global.Msg({msg: 'The sum amount is equal to transaction amount.'});
            } else {
                //this.lstAdjustment = [];
                Ext.getCmp(prototype.id + '-gridDataAdjustment_Chgbak').show();
                Ext.getCmp(prototype.id + '-panelADJ_Chgbak').show();
                var rec = Object.create(grid.getStore().getAt(rowIndex).data);
                var monto_ajustado = parseFloat(parseFloat(this.bean.SVFOP - this.sumAmount).toFixed(2))

                rec.A1531VFOP = monto_ajustado;
                rec.tot_VFOP = monto_ajustado;
                //rec.SADJUST = 0;
//                rec.A720AGENTE = $('#menuUser').text();
//                rec.CERROR = '01';
                this.lstAdjustment.push(rec);
                Ext.getCmp(prototype.id + '-gridDataAdjustment_Chgbak').bindStore(
                        Ext.create('Ext.data.Store', {data: this.lstAdjustment, autoLoad: true})
                        );
                this.calcularSumAmount(prefixDeb);
                this.calcularMontos(prefixDeb);
            }
        } else {
            global.Msg({msg: 'Can\'t adjust a blocked ticket.'});
        }

    },
    addAdjTicket_keyDownHandler: function () {
        var ticket = this.getValue('input-txtAdjTKTScan1').trim();
        var registro_adj = {};
        registro_adj.ST_MANUAL = '';
        registro_adj.FDESGLOSE = '2';
        registro_adj.A1531TTARJ = this.bean.SCARCOD;
        registro_adj.A1531NREF = this.bean.SCARDN;
        registro_adj.A1531CAPL = this.bean.SAUTHOC;
        registro_adj.A1531MFOP = this.bean.SCURRENCY;
        registro_adj.A1531TKT = ticket;
        registro_adj.A1531VFOP = this.bean.SVFOP;
        registro_adj.tot_VFOP = this.bean.SVFOP;
        registro_adj.A720FECVTA = this.bean.SDATE;
        registro_adj.A720PNR = this.bean.SPNR;
        //registro_adj.A720AGENTE = this.bean.SAGENT;
        registro_adj.A720AGENTE = $('#menuUser').text();
        ;
        registro_adj.descTDOC = 'Adj.';
        registro_adj.TDOC = 'A';
        this.lstSendManual.push(registro_adj);
        Ext.getCmp(prototype.id + '-gridDataInfoScan').bindStore(
                Ext.create('Ext.data.Store', {data: this.lstSendManual, autoLoad: true})
                );
        //meDE.getDataGrid(meDE.beanResult);
        this.calcularSumAmount();
        this.calcularMontos();
    },
    hiddenByMatch: function () {
        Ext.getCmp(prototype.id + '-btnClearCustom').hide();
//        $('.x-tab-top:contains("Blocked")').hide();
    },
    onWindowNormal: function () {
        if (this.bean.STVAL === '1' || this.bean.STVAL === '5') {
            Ext.getCmp(prototype.id + '-tabMain').setWidth(944);

        } else {
            Ext.getCmp(prototype.id + '-tabMain').setWidth(1024);
            Ext.getCmp(prototype.id + '-panelSumAmount').setMargin('0 0 0 296');
        }
    },
    onWindowBlocked: function () {
        Ext.getCmp(prototype.id + '-tabMain').setWidth(944);
        Ext.getCmp(prototype.id + '-panelSumAmount').setMargin('0 0 0 215');

    },
    allRefreshDataEntryDebits: function () {
        if (this.bean.STVAL === '1' || this.bean.STVAL === '4' || this.bean.STVAL === '5') {
            this.onSearchCompleteDetail();
        } else {
            this.onSearchPendingDetail();
        }
    },
    // <editor-fold defaultstate="collapsed" desc="Utilitarios">
    getValue: function (id) {
        return Ext.getCmp(prototype.id + '-' + id).getValue();
    },
    focus: function (id) {
        Ext.getCmp(prototype.id + '-' + id).focus();
    },
    setValue: function (id, txt) {
        Ext.getCmp(prototype.id + '-' + id).setValue(txt);
    },
    onUpperValue: function (field, newValue, oldValue) {
        field.setValue(newValue.toUpperCase());
    },
    onTextKeypress: function (obj, e, eOpts) {
        if (e.getKey() === e.ENTER) {
//            this.btnSearch_click();
        }
    },
// </editor-fold>
    agregaTicket: function (obj) {
        console.log('agregaTicket');
        if(obj.IN_TKT_ASIG!==''){
            Ext.getCmp(prototype.id + '-input-txtTKTScan1').setValue(obj.IN_TKT_ASIG);
//            meDe.addCreditCard_keyDownHandler();
    }
    }
});

