/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


Ext.define('Ext.Praxis.controller.sales.SalesReport.DataEntryGroupController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.' + prototype.idGr+ '-dataEntryGroupController',
    url: CONTEXTPATH + '/SalesReport',
    urlTotal: CONTEXTPATH + '/ControlFigures',
    strBankCode: '',
    meDE: '',
    beanDetTotal: {},
    beanDet: {},
    paramsGr: {},
    tabId: '0',
    tabName: prototype.idGr+ '-tabTkt',
    paramsDE: {
        IN_OPCION: '1',
        IN_AIRLIN: '139',
        IN_GRUPO: '',
        IN_TKT: '',
        IN_TRANSACTION: '',
        IN_IATA: ''
    },
    /**
     * Constructor
     */
    init: function(view) {
        meDE = this;
    },
    /**
     * Se ejecuta luego de haber cargado todos los componentes
     */
    // <editor-fold defaultstate="collapsed" desc="Configuracion y Validaciones">

    afterRender: function() { // global.AccessControlMaganer();
        var p = this.view.params;
        this.setStoreData();
        this.getDataInputs();
    },
    onUpperValue: function(field, newValue, oldValue) {
        field.setValue(newValue.toUpperCase());
    },
    setStoreData: function() {
        var cmbOptionTKT = Ext.getCmp(prototype.idGr+ '-de-cmbOptionTKT');
        cmbOptionTKT.bindStore(Ext.create('Ext.data.ArrayStore', {
            autoLoad: false,
            fields: ['code', 'name'],
            data: [
                ["1", "Select"],
                ["3", "Transaction"],
                ["2", "Document"],
                ["4", "Iata"]
            ]
        }));
        cmbOptionTKT.setValue("1");
        var cmbTransactionTKT = Ext.getCmp(prototype.idGr+ '-de-cmbTransactionTKT');
        cmbTransactionTKT.bindStore(Ext.create('Ext.data.ArrayStore', {
            autoLoad: false,
            fields: ['code', 'name'],
            data: [
                ["", "All"],
                ["SALE", "Sale"],
                ["EXCH", "Exchange"]
            ]
        }));
        cmbTransactionTKT.setValue("");
        var cmbOptionRF = Ext.getCmp(prototype.idGr+ '-de-cmbOptionRF');
        cmbOptionRF.bindStore(Ext.create('Ext.data.ArrayStore', {
            autoLoad: false,
            fields: ['code', 'name'],
            data: [
                ["1", "Select"],
                ["2", "Document"],
                ["3", "Iata"]
            ]
        }));
        cmbOptionRF.setValue("1");
        var cmbOptionADM = Ext.getCmp(prototype.idGr+ '-de-cmbOptionADM');
        cmbOptionADM.bindStore(Ext.create('Ext.data.ArrayStore', {
            autoLoad: false,
            fields: ['code', 'name'],
            data: [
                ["1", "Select"],
                ["3", "Transaction"],
                ["2", "Document"],
                ["4", "Iata"]
            ]
        }));
        cmbOptionADM.setValue("1");
        var cmbTransactionADM = Ext.getCmp(prototype.idGr+ '-de-cmbTransactionADM');
        cmbTransactionADM.bindStore(Ext.create('Ext.data.ArrayStore', {
            autoLoad: false,
            fields: ['code', 'name'],
            data: [
                ["", "All"],
                ["ADMS", "Adms"],
                ["ACMS", "Acms"],
                ["OTHERS", "Others"]
            ]
        }));
        cmbTransactionADM.setValue("");
    },
    onChangeComboTkt: function(obj, val) {
        switch (val) {
            case '1':
                Ext.getCmp(prototype.idGr+ '-de-cmbTransactionTKT').hide();
                Ext.getCmp(prototype.idGr+ '-de-txtTKTNumber').hide();
                Ext.getCmp(prototype.idGr+ '-de-txtIata').hide();
                break;
            case '3':
                Ext.getCmp(prototype.idGr+ '-de-cmbTransactionTKT').show();
                Ext.getCmp(prototype.idGr+ '-de-txtTKTNumber').hide();
                Ext.getCmp(prototype.idGr+ '-de-txtIata').hide();
                this.onFocus('-de-cmbTransactionTKT');
                break;
            case '2':
                Ext.getCmp(prototype.idGr+ '-de-cmbTransactionTKT').hide();
                Ext.getCmp(prototype.idGr+ '-de-txtTKTNumber').show();
                Ext.getCmp(prototype.idGr+ '-de-txtIata').hide();
                this.onFocus('-de-txtTKTNumber');
                break;
            case '4':
                Ext.getCmp(prototype.idGr+ '-de-cmbTransactionTKT').hide();
                Ext.getCmp(prototype.idGr+ '-de-txtTKTNumber').hide();
                Ext.getCmp(prototype.idGr+ '-de-txtIata').show();
                this.onFocus('-de-txtIata');
                break;
        }
    },
    onChangeComboRfnd: function(obj, val) {
        switch (val) {
            case '1':
                Ext.getCmp(prototype.idGr+ '-de-txtRFNNumber').hide();
                Ext.getCmp(prototype.idGr+ '-de-txtRFIata').hide();
                break;
            case '2':
                Ext.getCmp(prototype.idGr+ '-de-txtRFNNumber').show();
                Ext.getCmp(prototype.idGr+ '-de-txtRFIata').hide();
                this.onFocus('-de-txtRFNNumber');
                break;
            case '3':
                Ext.getCmp(prototype.idGr+ '-de-txtRFNNumber').hide();
                Ext.getCmp(prototype.idGr+ '-de-txtRFIata').show();
                this.onFocus('-de-txtRFIata');
                break;
        }
    },
    onChangeComboAdm: function(obj, val) {
        switch (val) {
            case '1':
                Ext.getCmp(prototype.idGr+ '-de-cmbTransactionADM').hide();
                Ext.getCmp(prototype.idGr+ '-de-txtADMNumber').hide();
                Ext.getCmp(prototype.idGr+ '-de-txtADMIata').hide();
                break;
            case '3':
                Ext.getCmp(prototype.idGr+ '-de-cmbTransactionADM').show();
                Ext.getCmp(prototype.idGr+ '-de-txtADMNumber').hide();
                Ext.getCmp(prototype.idGr+ '-de-txtADMIata').hide();
                this.onFocus('-de-cmbTransactionADM');
                break;
            case '2':
                Ext.getCmp(prototype.idGr+ '-de-cmbTransactionADM').hide();
                Ext.getCmp(prototype.idGr+ '-de-txtADMNumber').show();
                Ext.getCmp(prototype.idGr+ '-de-txtADMIata').hide();
                this.onFocus('-de-txtADMNumber');
                break;
            case '4':
                Ext.getCmp(prototype.idGr+ '-de-cmbTransactionADM').hide();
                Ext.getCmp(prototype.idGr+ '-de-txtADMNumber').hide();
                Ext.getCmp(prototype.idGr+ '-de-txtADMIata').show();
                this.onFocus('-de-txtADMIata');
                break;
        }
    },
    onChangeTab: function(obj, current, before) {
        meDE.paramsDE.IN_OPCION = '1';
        var tabActual = current.id;
        meDE.tabName = tabActual;
        switch (tabActual) {
            case prototype.idGr+ '-tabTkt':
                meDE.tabId = '0';
                break;
            case prototype.idGr+ '-tabTRfnd':
                meDE.tabId = '1';
                break;
            case prototype.idGr+ '-tabAdm':
                meDE.tabId = '2';
                break;
            case prototype.idGr+ '-tabTotal':
                meDE.tabId = '3';
                break;
        }
        this.btnSearch_click();
    },
// </editor-fold>

    // <editor-fold defaultstate="collapsed" desc="Obtencion y Pintado de datos">
    getDataInputs: function() {
        var p = this.view.params;
        var bean = p.rec.data;
        /*if (bean.A1530FUENT === 'MAN') {
            Ext.getCmp(prototype.idGr+ '-de-btnClose').show();
//		with(imgNew0){includeInLayout = visible = Boolean(app.validateProgram(this.NPROG,App.SECURITY_CREATE));}
//		with(imgRefresh){includeInLayout = visible = Boolean(app.validateProgram(this.NPROG,App.SECURITY_MODIFY));}
        }*/
        var strCity_Bank = bean.A1530CIUVT;
        if (strCity_Bank === 'IAP' || strCity_Bank === 'ELW' || strCity_Bank === 'IAR') {
            strCity_Bank = strCity_Bank + ' (' + bean.A1530BANCO + ')';
        }
        Ext.getCmp(prototype.idGr+ '-de-lblGroup').setValue(bean.A1530GRUPO);
        Ext.getCmp(prototype.idGr+ '-de-lblSource').setValue(bean.A1530FUENT);
        Ext.getCmp(prototype.idGr+ '-de-lblIATA').setValue(bean.A1530AGENT);
        Ext.getCmp(prototype.idGr+ '-de-lblCity_Bank').setValue(strCity_Bank);
        Ext.getCmp(prototype.idGr+ '-de-lblEndingFrom').setValue(bean.A1530FDESD);
        Ext.getCmp(prototype.idGr+ '-de-lblProcessing').setValue(bean.A1530FPROC);
        Ext.getCmp(prototype.idGr+ '-de-lblCurrency').setValue(bean.A1530MDA);
        Ext.getCmp(prototype.idGr+ '-de-lblCity_Bank_Code').setValue(bean.A1530BANCO);
        Ext.getCmp(prototype.idGr+ '-de-lblAccountDate').setValue(bean.A1530FCONT);
        Ext.getCmp(prototype.idGr+ '-de-lblChannel').setValue(bean.A1530SFUEN);
        Ext.getCmp(prototype.idGr+ '-de-lblNameIATA').setValue(bean.A003KEY3);
        Ext.getCmp(prototype.idGr+ '-de-lblCountry').setValue(bean.A1530PSVTA);
        Ext.getCmp(prototype.idGr+ '-de-lblEndingTo').setValue(bean.A1530FHAST);
        Ext.getCmp(prototype.idGr+ '-de-lblCycle').setValue(bean.A1530CPROC);
        Ext.getCmp(prototype.idGr+ '-de-lblWeek').setValue(bean.A1530SPROC);
        Ext.getCmp(prototype.idGr+ '-de-lblExchangeRate').setValue(Ext.util.Format.number(bean.A1530TCAMB, '0,000.000000')); //formatNumber6
        Ext.getCmp(prototype.idGr+ '-de-lblAccount').setValue(bean.A1530IDCON);
        Ext.getCmp(prototype.idGr+ '-de-lblStatus').setValue(bean.A1530STPRO);
        Ext.getCmp(prototype.idGr+ '-de-lblSabreCity').setValue(bean.A1530CSABR);
        Ext.getCmp(prototype.idGr+ '-de-lblSaleType').setValue(bean.A1530TVENT);
        Ext.getCmp(prototype.idGr+ '-de-lblCreated').setValue(bean.A1530USRIN);
        Ext.getCmp(prototype.idGr+ '-de-lblCreatedHour').setValue(bean.A1530FECIN);
        Ext.getCmp(prototype.idGr+ '-de-lblUpdated').setValue(bean.A1530USRAC);
        Ext.getCmp(prototype.idGr+ '-de-lblUpdatedHour').setValue(bean.A1530FECAC);
        Ext.getCmp(prototype.idGr+ '-de-lblAssigned').setValue(bean.A1530USRAU);
        Ext.getCmp(prototype.idGr+ '-de-lblAssignedHour').setValue(bean.A1530FECAN);
        if (bean.A1530POLGL.trim() === '' && bean.A1530POLAR.trim() === '' && bean.A1530POLAP.trim() === '') {
            Ext.getCmp(prototype.idGr+ '-de-lblPoliza').setValue('');
        }
        else {
            Ext.getCmp(prototype.idGr+ '-de-lblPoliza').setValue(bean.A1530POLGL + '/' + bean.A1530POLAR + '/' + bean.A1530POLAP);
        }
        if (bean.A1530TICAP === 'A') {
            Ext.getCmp(prototype.idGr+ '-de-lblCapture').setValue('AUTOMATIC');
        }
        else {
            Ext.getCmp(prototype.idGr+ '-de-lblCapture').setValue('MANUAL');
        }
        Ext.getCmp(prototype.idGr+ '-de-lblIdFile').setValue(bean.A1530IDFIL);
        Ext.getCmp(prototype.idGr+ '-de-lblVoidReport').setValue(bean.A1530STVOI);
        this.btnSearch_click();
    },
    setGridData: function(url, grilla, paggin, title) {
        if (title === 'TOTALS') {
            this.searchDet(url,title);
        }else{
            var storeGridDatas = Ext.create('Ext.Praxis.store.sales.GridData', {
                proxy: {
                    url: url
                },
                listeners: {
                    beforeload: function(obj) {
                        obj.proxy.extraParams = meDE.paramsDE;
                    },
                    load: function(obj) {
                        if (paggin !== prototype.idGr+ '') {
                            var pag = Ext.getCmp(paggin);
                            var pagData = pag.getPageData();
    //                    Ext.getCmp(prototype.idGr+ '-lbl-currentPage').setText(Ext.util.Format.number(pagData.currentPage, '0,000'));
    //                    Ext.getCmp(prototype.idGr+ '-lbl-pageCount').setText(Ext.util.Format.number(pagData.pageCount, '0,000'));
    //                    Ext.getCmp(prototype.idGr+ '-lbl-total').setText(Ext.util.Format.number(pagData.total, '0,000'));
                        }

                        if (obj.data.length === 0) {
                            global.Msg({
                                msg: 'Data not found.'
                            });
                        } else {
                            var item = obj.data.items[0].data;
                            if (paggin !== prototype.idGr+ '') {
                                Ext.getCmp(meDE.tabName).setTitle(title + ' (' + item.page.TOTROW + '/' + item.QTY_ERROR + ')');
                            }
                        }
                    }
                }
            });
            global.clear();
            Ext.getCmp(grilla).bindStore(storeGridDatas);
            if (paggin !== prototype.idGr+ '') {
                Ext.getCmp(paggin).bindStore(storeGridDatas);
            }
        }
    },
    //<editor-fold defaultstate="collapsed" desc="searchDet">
    searchDet: function(url, title) {
        this.beanDet.IN_A1720CCUST = '139';
        this.beanDet.IN_A1720GRUPO = Ext.getCmp(prototype.idGr+ '-de-lblGroup').getValue();
        var contenedor = Ext.getCmp(prototype.idGr+'-tabTotal');
        contenedor.removeAll();
        Ext.Ajax.request({
            url: url,
            method: 'POST',
            timeout: 60000000,
            params: { beanString: JSON.stringify(this.beanDet) },
            beforerequest: Ext.getCmp(prototype.idGr+'-tabMain').mask('Loading...'),
            success: function(response, opts){
                Ext.getCmp(prototype.idGr+'-tabMain').unmask();
                var res = Ext.JSON.decode(response.responseText);
                if (res.success) {
                    var data = res.lstControlfiguresDetRep;                    
                    //<editor-fold defaultstate="collapsed" desc="dataRoot">
                    var a= [];
                    var dataRoot = {text: '.', expanded: false, children:[]};                    
                    Ext.Object.each(data, function(index, value){
                        if ( a.indexOf(value.A1720NATUR_00) < 0 )
                        {
                            a.push(value.A1720NATUR_00);
                            dataRoot.children.push({
                                DESCRIPTION: value.A1720NATUR_00, 
                                A1720QTRSA : parseInt(value.A1720QTRSA), 
                                A1720VSALC : parseFloat(value.A1720VSALC), 
                                A1720QTRRF : parseInt(value.A1720QTRRF), 
                                A1720VRFLC: parseFloat(value.A1720VRFLC), 
                                A1720VNTLC : parseFloat(value.A1720VNTLC),                                                                 
                                A1720VSARV : parseFloat(value.A1720VSARV), 
                                A1720VRFRV : parseFloat(value.A1720VRFRV), 
                                A1720VNTRV : parseFloat(value.A1720VNTRV), 
                                LINK_DETAIL: '', 
                                LINK_DETAIL2: 'A',
                                A1720TIPO: value.A1720TIPO,
                                A1720STIPO: value.A1720STIPO,
                                expanded : false, children:[] });
                            var b = [];
                            Ext.Object.each(data, function(index, value01){
                                if ( value.A1720NATUR_00 === value01.A1720NATUR_00 ){
                                    if ( b.indexOf(value01.A1720TIPO_00) < 0 ){
                                        b.push(value01.A1720TIPO_00);
                                        dataRoot.children[a.indexOf(value.A1720NATUR_00)].children.push({
                                            DESCRIPTION: value01.A1720TIPO_00, 
                                            A1720QTRSA : parseInt(value01.A1720QTRSA), 
                                            A1720VSALC : parseFloat(value01.A1720VSALC), 
                                            A1720QTRRF : parseInt(value01.A1720QTRRF), 
                                            A1720VRFLC: parseFloat(value01.A1720VRFLC), 
                                            A1720VNTLC : parseFloat(value01.A1720VNTLC), 
                                            A1720VSARV : parseFloat(value01.A1720VSARV), 
                                            A1720VRFRV : parseFloat(value01.A1720VRFRV), 
                                            A1720VNTRV : parseFloat(value01.A1720VNTRV), 
                                            LINK_DETAIL: '',
                                            LINK_DETAIL2: 'B',
                                            A1720TIPO: value01.A1720TIPO,
                                            A1720STIPO: value01.A1720STIPO,
                                            expanded : false, children:[] 
                                        });

                                        Ext.Object.each(data, function(index, value02){                                            
                                            if ( ( value01.A1720NATUR_00 === value02.A1720NATUR_00 ) &&  ( value01.A1720TIPO_00 === value02.A1720TIPO_00 ) ){                                                
                                                dataRoot.children[a.indexOf(value01.A1720NATUR_00)].children[b.indexOf(value01.A1720TIPO_00)].children.push({
                                                    DESCRIPTION: value02.A1720DESCR, 
                                                    A1720TIPO_00: value01.A1720TIPO_00,
                                                    A1720QTRSA : parseInt(value02.A1720QTRSA), 
                                                    A1720VSALC : parseFloat(value02.A1720VSALC), 
                                                    A1720QTRRF : parseInt(value02.A1720QTRRF), 
                                                    A1720VRFLC: parseFloat(value02.A1720VRFLC), 
                                                    A1720VNTLC : parseFloat(value02.A1720VNTLC), 
                                                    A1720VSARV : parseFloat(value02.A1720VSARV), 
                                                    A1720VRFRV : parseFloat(value02.A1720VRFRV), 
                                                    A1720VNTRV : parseFloat(value02.A1720VNTRV),
                                                    LINK_DETAIL: value02.LINK_DETAIL,//'1'
                                                    LINK_DETAIL2: 'C',
                                                    A1720TIPO  : value02.A1720TIPO,
                                                    A1720STIPO : value02.A1720STIPO,
                                                    leaf: true 
                                                });
                                                // console.log( dataRoot.children[a.indexOf(value.A1720NATUR_00)].children[b.indexOf(value01.A1720TIPO_00)] );
                                            }
                                        });
                                    }else{
                                        dataRoot.children[a.indexOf(value.A1720NATUR_00)].children[b.indexOf(value01.A1720TIPO_00)].A1720QTRSA += parseInt(value01.A1720QTRSA);
                                        dataRoot.children[a.indexOf(value.A1720NATUR_00)].children[b.indexOf(value01.A1720TIPO_00)].A1720VSALC += parseFloat(value01.A1720VSALC);
                                        dataRoot.children[a.indexOf(value.A1720NATUR_00)].children[b.indexOf(value01.A1720TIPO_00)].A1720QTRRF += parseInt(value01.A1720QTRRF);

                                        dataRoot.children[a.indexOf(value.A1720NATUR_00)].children[b.indexOf(value01.A1720TIPO_00)].A1720VRFLC += parseInt(value01.A1720VRFLC);

                                        dataRoot.children[a.indexOf(value.A1720NATUR_00)].children[b.indexOf(value01.A1720TIPO_00)].A1720VNTLC += parseFloat(value01.A1720VNTLC);
                                        dataRoot.children[a.indexOf(value.A1720NATUR_00)].children[b.indexOf(value01.A1720TIPO_00)].A1720VSARV += parseFloat(value01.A1720VSARV);
                                        dataRoot.children[a.indexOf(value.A1720NATUR_00)].children[b.indexOf(value01.A1720TIPO_00)].A1720VRFRV += parseFloat(value01.A1720VRFRV);
                                        dataRoot.children[a.indexOf(value.A1720NATUR_00)].children[b.indexOf(value01.A1720TIPO_00)].A1720VNTRV += parseFloat(value01.A1720VNTRV);                                        
                                    }
                                }
                            });
                        }
                        else{
                            dataRoot.children[a.indexOf(value.A1720NATUR_00)].A1720QTRSA += parseInt(value.A1720QTRSA);
                            dataRoot.children[a.indexOf(value.A1720NATUR_00)].A1720VSALC += parseFloat(value.A1720VSALC);
                            dataRoot.children[a.indexOf(value.A1720NATUR_00)].A1720QTRRF += parseInt(value.A1720QTRRF);                            
                            dataRoot.children[a.indexOf(value.A1720NATUR_00)].A1720VRFLC += parseFloat(value.A1720VRFLC);                            
                            dataRoot.children[a.indexOf(value.A1720NATUR_00)].A1720VNTLC += parseFloat(value.A1720VNTLC);
                            dataRoot.children[a.indexOf(value.A1720NATUR_00)].A1720VSARV += parseFloat(value.A1720VSARV);
                            dataRoot.children[a.indexOf(value.A1720NATUR_00)].A1720VRFRV += parseFloat(value.A1720VRFRV);
                            dataRoot.children[a.indexOf(value.A1720NATUR_00)].A1720VNTRV += parseFloat(value.A1720VNTRV);
                        }
                    });
                    //</editor-fold>

                    //<editor-fold defaultstate="collapsed" desc="gridControlFigSR">
                    var tree = Ext.create('Ext.tree.Panel',{
                        id: prototype.idGr+'-gridControlFigSR', 
                        width: '98%',
                        height:'100%',      
                        border: true,
                        root: dataRoot,
                        reserveScrollbar: false,
                        useArrows: true,
                        rootVisible: false,
                        multiSelect: false,
                        columnLines: true,
                        rowLines: true,
                        columns: {
                            defaults: {
                                menuDisabled: true,
                                sortable: true,
                                align: 'center'
                            },
                            items: [
                                {
                                    xtype: 'treecolumn',
                                    text: 'Description',
                                    align: 'center',
                                    dataIndex: 'DESCRIPTION',
                                    //flex: 1,
                                    width: 150,
                                    renderer: function(value, metaData, record, rowIndex, colIndex){
                                        switch (record.data.LINK_DETAIL2) {
                                            case 'A': metaData.style = "text-align:left;font-weight:bold;color:#0000FF;"; break;
                                            case 'B': metaData.style = "text-align:left;font-weight:bold;color:#008000;"; break;
                                            case 'C': metaData.style = "text-align:left;"; break;
                                        }
                                        return value;
                                    }
                                },
                                {
                                    text: 'Original Currency',
                                    id: prototype.idGr+'-gridControlFigSR_GridCol01',
                                    defaults: {
                                        menuDisabled: true,
                                        sortable: true,
                                        align: 'center'
                                    },
                                    columns:[
                                        {
                                            text: 'Trans <br>Qty <br>Sal.',
                                            dataIndex: 'A1720QTRSA',
                                            width: 70,
                                            align: 'right',
                                            sortable: false,
                                            renderer: function(value, metaData, record, rowIndex, colIndex){
                                                switch (record.data.LINK_DETAIL2) {
                                                    case 'A': metaData.style = "text-align:right;font-weight:bold;color:#0000FF;"; break;
                                                    case 'B': metaData.style = "text-align:right;font-weight:bold;color:#008000;"; break;
                                                    case 'C': metaData.style = "text-align:right;"; break;
                                                }
                                                return Ext.util.Format.number(value, '0,000');
                                            }
                                        },
                                        {
                                            text: 'Sales',
                                            dataIndex: 'A1720VSALC',
                                            width: 100,
                                            renderer:function(value, metaData, record, rowIndex, colIndex,store){                                                   
                                                switch (record.data.LINK_DETAIL2) {
                                                    case 'A': metaData.style = "text-align:right;font-weight:bold;color:#0000FF;"; break;
                                                    case 'B': metaData.style = "text-align:right;font-weight:bold;color:#008000;"; break;
                                                    case 'C': metaData.style = "text-align:right;"; break;
                                                }
                                                return Ext.util.Format.number(value, '0,000.00');
                                            }
                                        },
                                        {
                                            text: '', dataIndex: '', width: 27,
                                            listeners: {
                                                click: 'gridData_act1_clickHandler'
                                            },
                                            renderer: function(value, metaData, record, rowIndex, colIndex,store){
                                                if(record.data.LINK_DETAIL2 === 'C' ) return '<img src="resources/img/botones/16x16/application_view_detail.png">';
                                                else return '';
                                            }
                                        },
                                        {
                                            text: 'Trans<br> Qty <br>Ref.',
                                            dataIndex: 'A1720QTRRF',
                                            width: 70,
                                            sortable: false,
                                            align: 'right',
                                            renderer: function(value, metaData, record, rowIndex, colIndex){
                                                switch (record.data.LINK_DETAIL2) {
                                                    case 'A': metaData.style = "text-align:right;font-weight:bold;color:#0000FF;"; break;
                                                    case 'B': metaData.style = "text-align:right;font-weight:bold;color:#008000;"; break;
                                                    case 'C': metaData.style = "text-align:right;"; break;
                                                }
                                                return Ext.util.Format.number(value, '0,000');
                                            }
                                        },
                                        {
                                            text: 'Refund',
                                            dataIndex: 'A1720VRFLC',
                                            width: 100,
                                            renderer:function(value, metaData, record, rowIndex, colIndex,store){                                                   
                                                switch (record.data.LINK_DETAIL2) {
                                                    case 'A': metaData.style = "text-align:right;font-weight:bold;color:#0000FF;"; break;
                                                    case 'B': metaData.style = "text-align:right;font-weight:bold;color:#008000;"; break;
                                                    case 'C': metaData.style = "text-align:right;"; break;
                                                }
                                                return Ext.util.Format.number(value, '0,000.00');                                               
                                            }
                                        },      
                                        {
                                            text: '', dataIndex: '', width: 27,
                                            listeners: {
                                                click: 'gridData_act2_clickHandler'
                                            },
                                            renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                if(record.data.LINK_DETAIL2 === 'C' ) return '<img src="resources/img/botones/16x16/application_view_detail.png">';
                                                else return '';
                                            }
                                        },
                                        {
                                            text: 'Net',
                                            dataIndex: 'A1720VNTLC',
                                            width: 100,
                                            renderer: function(value, metaData, record, rowIndex, colIndex){
                                                switch (record.data.LINK_DETAIL2) {
                                                    case 'A': metaData.style = "text-align:right;font-weight:bold;color:#0000FF;"; break;
                                                    case 'B': metaData.style = "text-align:right;font-weight:bold;color:#008000;"; break;
                                                    case 'C': metaData.style = "text-align:right;"; break;
                                                }
                                                return Ext.util.Format.number(value, '0,000.00');
                                            }
                                        }
                                    ]
                                },
                                {
                                    text: '', dataIndex: '', width: 40
                                },
                                {
                                    text: 'Converted Currency',
                                    id: prototype.idGr+'-gridControlFigSR_GridCol02',
                                    defaults: {
                                        menuDisabled: true,
                                        sortable: true,
                                        align: 'center'
                                    },
                                    columns:[
                                        {
                                            text: 'Sales',
                                            dataIndex: 'A1720VSARV',
                                            width: 100,
                                            renderer: function(value, metaData, record, rowIndex, colIndex){
                                                switch (record.data.LINK_DETAIL2) {
                                                    case 'A': metaData.style = "text-align:right;font-weight:bold;color:#0000FF;"; break;
                                                    case 'B': metaData.style = "text-align:right;font-weight:bold;color:#008000;"; break;
                                                    case 'C': metaData.style = "text-align:right;"; break;
                                                }
                                                return Ext.util.Format.number(value, '0,000.00');
                                            }
                                        },
                                        {
                                            text: 'Refund',
                                            dataIndex: 'A1720VRFRV',
                                            width: 100,
                                            renderer: function(value, metaData, record, rowIndex, colIndex){
                                                switch (record.data.LINK_DETAIL2) {
                                                    case 'A': metaData.style = "text-align:right;font-weight:bold;color:#0000FF;"; break;
                                                    case 'B': metaData.style = "text-align:right;font-weight:bold;color:#008000;"; break;
                                                    case 'C': metaData.style = "text-align:right;"; break;
                                                }
                                                return Ext.util.Format.number(value, '0,000.00');
                                            }
                                        },
                                        {
                                            text: 'Net',
                                            dataIndex: 'A1720VNTRV',
                                            width: 140,
                                            renderer: function(value, metaData, record, rowIndex, colIndex){
                                                switch (record.data.LINK_DETAIL2) {
                                                    case 'A': metaData.style = "text-align:right;font-weight:bold;color:#0000FF;"; break;
                                                    case 'B': metaData.style = "text-align:right;font-weight:bold;color:#008000;"; break;
                                                    case 'C': metaData.style = "text-align:right;"; break;
                                                }
                                                return Ext.util.Format.number(value, '0,000.00');
                                            }
                                        }
                                    ]
                                }
                            ]
                        },
                        dockedItems:{
                            xtype: 'toolbar',
                            dock: 'left',
                            border: false,
                            items:[
                                {
                                    xtype: 'button',
                                    icon: 'resources/img/botones/expanded.png',
                                    tooltip: 'Expand the tree',
                                    enableToggle: true,
                                    toggleHandler: function (button, pressed, eOpts) {
                                        Ext.getCmp(prototype.idGr+'-gridControlFigSR').expandAll();
                                    }
                                },
                                {
                                    xtype: 'button',
                                    icon: 'resources/img/botones/collaped.png',
                                    tooltip: 'Collapse the tree',
                                    enableToggle: true,
                                    toggleHandler: function (button, pressed, eOpts) {
                                        Ext.getCmp(prototype.idGr+'-gridControlFigSR').collapseAll();
                                    }
                                },
                                {
                                    xtype: 'button',
                                    icon: 'resources/img/botones/arrow-refresh.png',
                                    tooltip: 'Refresh',
                                    enableToggle: true,
                                    toggleHandler: function (button, pressed, eOpts) {
                                       var msj = '';
                                        if (Ext.getCmp(prototype.idGr+ '-de-lblGroup').getValue() === '' || Ext.getCmp(prototype.idGr+ '-de-lblStatus').getValue() === 'CLOSED') {
                                           msj = 'The group is readonly';
                                        }
                                        if (msj.trim() !== '') {
                                            global.Msg({
                                                msg: msj
                                            });
                                        }else {
                                            var A1530TICAP = Ext.getCmp(prototype.idGr+ '-de-lblCapture').getValue().substr(0,1);
                                            var A1530IDFIL = Ext.getCmp(prototype.idGr+ '-de-lblIdFile').getValue();
                                            var A1530GRUPO = Ext.getCmp(prototype.idGr+ '-de-lblGroup').getValue();
                                            meDE.beanDetTotal.A1530TICAP=A1530TICAP;
                                            meDE.beanDetTotal.A1530IDFIL=A1530IDFIL;
                                            meDE.beanDetTotal.A1530GRUPO=A1530GRUPO;
                                            /*paramsGr = {
                                                A1530TICAP: A1530TICAP,
                                                A1530IDFIL: A1530IDFIL,
                                                A1530GRUPO: 
                                            };*/
                                            Ext.Msg.show({
                                                title: '.:PRAXISAM:.',
                                                msg: 'Are you sure to refresh?',
                                                buttons: Ext.MessageBox.YESNO,
                                                scope: meDE,
                                                icon: Ext.MessageBox.QUESTION,
                                                modal: true,
                                                fn: function(btn) {
                                                    if (btn === 'yes') {
                                                        Ext.Ajax.request({
                                                            url: meDE.url + '/refreshGroup',
                                                            method: 'POST',
                                                            timeout: 60000000,
                                                             params: {beanString: JSON.stringify(meDE.beanDetTotal)},
                                                            //params: paramsGr,
                                                            beforerequest: Ext.getCmp(prototype.idGr+ '-DataEntry-center').mask('Loading...', ''),
                                                            success: function(response, options) {
                                                                Ext.getCmp( prototype.idGr+ '-DataEntry-center').unmask('Loading...', '');
                                                                var res = Ext.JSON.decode(response.responseText);
                                                                //var data = res.objRtn;
                                                                var msj = res.data.dbException.MESSAGE;
                                                                var sqlCode = res.data.dbException.SQLCODE;
                                                                if (sqlCode !== '0') {
                                                                    global.Msg({
                                                                        msg: msj
                                                                    });
                                                                } else {
                                                                    global.Msg({
                                                                        msg: msj,
                                                                        icon: 1,
                                                                        fn: function() {
                                                                            var url1 = this.urlTotal + '/searchDet';
                                                                            var title = 'TOTALS';
                                                                            var grilla = prototype.idGr+'-de-gridDataTotal';
                                                                            var pag = prototype.idGr+'-de-paggin4';
                                                                            meDE.setGridData(url1, grilla, pag, title);
                                                                            //exito
                                                                           // Ext.getCmp(prototype.idGr+ '-dataEntry').close();
                                                                            //Ext.getCmp(prototype.idGr+ '-btnSearch').fireEvent('click', {});
                                                                        }
                                                                    });
                                                                }
                                                            }
                                                        });
                                                    }
                                                }
                                            });
                                        }
                                    }
                                }
                                
                            ]
                        },
                        viewConfig: {
                            stripeRows: true,
                            enableTextSelection: true,
                            markDirty: false,
                            getRowClass: function(record, rowIndex, rowParams, store) {
                                if ( rowIndex % 2 == 0 ) return 'rowA';
                            }
                        }
                    });
                    //</editor-fold>

                    var store = Ext.getCmp(prototype.idGr+'-gridControlFigSR').getStore();
                    store.sorters.add(new Ext.util.Sorter({
                        property : 'DESCRIPTION',
                        direction: 'DESC'
                    }));

                    if (data.length > 0) {
                        var file = data[0];
                        Ext.getCmp(prototype.idGr+'-gridControlFigSR_GridCol01').setText(title);
                        Ext.getCmp(prototype.idGr+'-gridControlFigSR_GridCol02').setText('Converted Currency '+ file.A1720MDARV);
                    } else {
                        Ext.getCmp(prototype.idGr+'-gridControlFigSR').getStore().removeAll();
                    }
                    contenedor.add(tree);
                    contenedor.updateLayout();
                } else global.Msg({ msg: res.sesion });
            },
            failure: function(response, opts) {
                Ext.getCmp(prototype.idGr+'-tabMain').unmask();
            }
        });
    },
    //</editor-fold>
    onClickBtnSearch: function() {
        //meDE.paramsDE.IN_OPCION = '2';
        switch (meDE.tabId) {
            case '0':
                meDE.paramsDE.IN_OPCION = Ext.getCmp(prototype.idGr+ '-de-cmbOptionTKT').getValue();
                break;
            case '1':
                meDE.paramsDE.IN_OPCION = Ext.getCmp(prototype.idGr+ '-de-cmbOptionRF').getValue();
                break;
            case '2':
                meDE.paramsDE.IN_OPCION = Ext.getCmp(prototype.idGr+ '-de-cmbOptionADM').getValue();
                break;
            case '3':
                meDE.paramsDE.IN_OPCION = '2';
                break;
        }
        this.btnSearch_click();
    },
    btnSearch_click: function() {
        var url1 = '';
        var title = '';
        var grilla = prototype.idGr+ '';
        var pag = prototype.idGr+ '';
        meDE.paramsDE.IN_GRUPO = Ext.getCmp(prototype.idGr+ '-de-lblGroup').getValue();
        switch (meDE.tabId) {
            case '0':
                url1 += this.url + '/loadTicket';
                grilla += '-de-gridDataTkt';
                pag += '-de-paggin1';
                title += 'TKT';
                meDE.paramsDE.IN_TKT = Ext.getCmp(prototype.idGr+ '-de-txtTKTNumber').getValue();
                meDE.paramsDE.IN_TRANSACTION = Ext.getCmp(prototype.idGr+ '-de-cmbTransactionTKT').getValue();
                meDE.paramsDE.IN_IATA = Ext.getCmp(prototype.idGr+ '-de-txtIata').getValue();
                break;
            case '1':
                url1 += this.url + '/loadRefund';
                grilla += '-de-gridDataRfnd';
                pag += '-de-paggin2';
                title += 'RFND';
                meDE.paramsDE.IN_TKT = Ext.getCmp(prototype.idGr+ '-de-txtRFNNumber').getValue();
                meDE.paramsDE.IN_IATA = Ext.getCmp(prototype.idGr+ '-de-txtRFIata').getValue();
                break;
            case '2':
                url1 += this.url + '/loadADM';
                grilla += '-de-gridDataAdm';
                pag += '-de-paggin3';
                title += 'ADM/ACM';
                meDE.paramsDE.IN_TKT = Ext.getCmp(prototype.idGr+ '-de-txtADMNumber').getValue();
                meDE.paramsDE.IN_TRANSACTION = Ext.getCmp(prototype.idGr+ '-de-cmbTransactionADM').getValue();
                meDE.paramsDE.IN_IATA = Ext.getCmp(prototype.idGr+ '-de-txtADMIata').getValue();
                break;
            case '3':
                url1 += this.urlTotal + '/searchDet';
                grilla += '-de-gridDataTotal';
                pag += '-de-paggin4';
                title += 'TOTALS';
                break;
        }
        Ext.getCmp(meDE.tabName).setTitle(title);
        this.setGridData(url1, grilla, pag, title);
    },
// </editor-fold>
    onCancelClick: function(btn) {
        Ext.getCmp(prototype.idGr+ '-dataEntry').close();
    },
    onViewErrorClick: function(btn) {
        var p = this.view.params;
        var data = p.rec.data;
        var dataEntryError = Ext.create('Ext.Praxis.view.sales.SalesReportForm.DataEntryError', {
            id: prototype.idGr+ '-dataEntryError',
            params: {
                data: data
            }
        });
        dataEntryError.show();
    },
    onEditClick: function(grid, rowIndex, colIndex) {
        var id = grid.grid.id;
        var rec = grid.getStore().getAt(rowIndex);
        console.log(prototype.idGr);
        console.log(prototype.idSale);
        switch (id) {
            case prototype.idGr+ '-de-gridDataTkt':
                var dataEntryTkt = Ext.create('Ext.Praxis.view.sales.SalesReportForm.DataEntryTkt', {
                    id: prototype.idGr+ '-dataEntryTkt',
                    params: {
                        rec: rec
                    }
                });
                console.log(rec);
                dataEntryTkt.show();
                break;
            case prototype.idGr+ '-de-gridDataRfnd':
                var dataEntryRfnd = Ext.create('Ext.Praxis.view.sales.SalesReportForm.DataEntryRfnd', {
                    id: prototype.idRfnd + '-dataEntryRfnd',
                    params: {
                        rec: rec,
                        modo: 'U',
                        exchrate: Ext.getCmp(prototype.idGr + '-de-lblExchangeRate').getValue(),
                        locCurr: Ext.getCmp(prototype.idGr + '-de-lblCurrency').getValue()
                    }
                });
                dataEntryRfnd.show();
                break;
            case prototype.idGr+ '-de-gridDataAdm':
                var dataEntryAdm = Ext.create('Ext.Praxis.view.sales.SalesReportForm.DataEntryAdm', {
                    id: prototype.idAdm + '-dataEntryAdm',
                    params: {
                        rec: rec,
                        exchrate: Ext.getCmp(prototype.idGr + '-de-lblExchangeRate').getValue(),
                        locCurr: Ext.getCmp(prototype.idGr + '-de-lblCurrency').getValue()
                    }
                });
                dataEntryAdm.show();
                break;
        }
    },
    onClickBtnAdd: function(grid, rowIndex, colIndex) {
        //Ext.getCmp()
        switch (meDE.tabName) {
            case prototype.idGr+ '-tabTkt':
                break;
            case prototype.idGr+ '-tabTRfnd':
                var dataEntryRfnd = Ext.create('Ext.Praxis.view.sales.SalesReportForm.DataEntryRfnd', {
                    id: prototype.idRfnd + '-dataEntryRfnd',
                    params: {
                        rec: '',
                        modo: 'I'
                    }
                });
                dataEntryRfnd.show();
                break;
            case prototype.idGr+ '-tabAdm':
                break;
        }
    },
    onClickBtnPagFirst: function(component) {
        var id = component.id;
        var idNumber = id.charAt(id.length - 1);
        var pag = Ext.getCmp(prototype.idGr+ '-de-paggin' + idNumber);
        pag.moveFirst();
    },
    onClickBtnPagPrevious: function(component) {
        var id = component.id;
        var idNumber = id.charAt(id.length - 1);
        var pag = Ext.getCmp(prototype.idGr+ '-de-paggin' + idNumber);
        pag.movePrevious();
    },
    onClickBtnPagNext: function(component) {
        var id = component.id;
        var idNumber = id.charAt(id.length - 1);
        var pag = Ext.getCmp(prototype.idGr+ '-de-paggin' + idNumber);
        pag.moveNext();
    },
    onClickBtnPagLast: function(component) {
        var id = component.id;
        var idNumber = id.charAt(id.length - 1);
        var pag = Ext.getCmp(prototype.idGr+ '-de-paggin' + idNumber);
        pag.moveLast();
    },
    onClickBtnFilter: function(component) {
        var id = component.id;
        var idNumber = id.charAt(id.length - 1);
        var option = Ext.getCmp(prototype.idGr+ '-panelFilter' + idNumber);
        if (option.isVisible()) {
            option.setVisible(false);
        } else {
            option.setVisible(true);
            switch (idNumber) {
                case '1':
                    Ext.getCmp(prototype.idGr+ '-de-cmbOptionTKT').setValue("2");
                    this.onChangeComboTkt(null,'2');
                    break;
                case '2':
                    Ext.getCmp(prototype.idGr+ '-de-cmbOptionRF').setValue("2");
                    this.onChangeComboRfnd(null,'2');
                    //this.onFocus('-de-txtRFNNumber');
                    break;
                case '3':
                    Ext.getCmp(prototype.idGr+ '-de-cmbOptionADM').setValue("2");
                    this.onChangeComboAdm(null,'2');
                    break;
            }
        }
    },
    onFocus: function(id) {
        Ext.getCmp(prototype.idGr+ id).focus();
    },
    onTextKeypress: function(obj, e, eOpts) {
        if (e.getKey() === e.ENTER) {
            this.onClickBtnSearch();
        }
    },
    onClickBtnClear: function() {
        Ext.getCmp(prototype.idGr+ '-de-txtRFNNumber').setValue('');
        Ext.getCmp(prototype.idGr+ '-de-cmbTransactionTKT').setValue('');
        Ext.getCmp(prototype.idGr+ '-de-txtTKTNumber').setValue('');
        Ext.getCmp(prototype.idGr+ '-de-cmbOptionTKT').setValue('2');
        Ext.getCmp(prototype.idGr+ '-de-cmbOptionRF').setValue('2');
        Ext.getCmp(prototype.idGr+ '-de-cmbOptionADM').setValue('2');
        Ext.getCmp(prototype.idGr+ '-de-cmbTransactionADM').setValue('');
        Ext.getCmp(prototype.idGr+ '-de-txtADMNumber').setValue('');
    },
    onClickBtnBack: function() {
        //Ext.getCmp(prototype.idGr+ '-dataEntryGrupo').close();
        this.view.close();
    },
    onClickBtnExcel: function(obj, e) {
        Ext.Msg.show({
            title: '.:PRAXISAM:.',
            msg: 'Download Excel ?',
            buttons: Ext.MessageBox.OKCANCEL,
            scope: this,
            icon: Ext.MessageBox.QUESTION,
            modal: true,
            fn: function(btn) {
                if (btn === 'ok') {
                    this.exportExcel();
                }
            }
        });
    },
    exportExcel: function() {
        global.getFile(this.url + '/getGroupXLSX?IN_OPCION=' + meDE.paramsDE.IN_OPCION
                + '&IN_AIRLIN=' + meDE.paramsDE.IN_AIRLIN
                + '&IN_GRUPO=' + meDE.paramsDE.IN_GRUPO
                + '&IN_TKT=' + meDE.paramsDE.IN_TKT
                + '&IN_TRANSACTION=' + meDE.paramsDE.IN_TRANSACTION
                + '&IN_IATA=' + meDE.paramsDE.IN_IATA
                );
    },
    onClosedGroup: function() {
        var msj = '';
        if (Ext.getCmp(prototype.idGr+ '-de-lblGroup').getValue() === '' || Ext.getCmp(prototype.idGr+ '-de-lblStatus').getValue() === 'CLOSED') {
          //  msj = 'The group is readonly';
        }
        if (msj.trim() !== '') {
            global.Msg({
                msg: msj
            });
        }else {
            var A1530TICAP = Ext.getCmp(prototype.idGr+ '-de-lblCapture').getValue();
            var A1530IDFIL = Ext.getCmp(prototype.idGr+ '-de-lblIdFile').getValue();
            var A1530GRUPO = Ext.getCmp(prototype.idGr+ '-de-lblGroup').getValue();
            paramsGr = {
                A1530TICAP: A1530TICAP,
                A1530IDFIL: A1530IDFIL,
                A1530GRUPO: A1530GRUPO
            };
            Ext.Msg.show({
                title: '.:PRAXISAM:.',
                msg: 'Are you sure to close?',
                buttons: Ext.MessageBox.YESNO,
                scope: this,
                icon: Ext.MessageBox.QUESTION,
                modal: true,
                fn: function(btn) {
                    if (btn === 'yes') {
                        Ext.Ajax.request({
                            url: this.url + '/closeGroup',
                            method: 'POST',
                            timeout: 60000000,
                            params: paramsGr,
                            beforerequest: Ext.getCmp(prototype.idGr+ '-DataEntry-center').mask('Loading...', ''),
                            success: function(response, options) {
                                Ext.getCmp( prototype.idGr+ '-DataEntry-center').unmask('Loading...', '');
                                var res = Ext.JSON.decode(response.responseText);
                                console.log(res);
                                var data = res.objRtn;
                                var msj = res.data.dbException.MESSAGE;
                                var sqlCode = res.data.dbException.SQLCODE;
                                if (sqlCode !== '0') {
                                    global.Msg({
                                        msg: msj
                                    });
                                } else {
                                    global.Msg({
                                        msg: msj,
                                        icon: 1,
                                        fn: function() {
                                            //exito
                                            Ext.getCmp(prototype.idGr+ '-dataEntry').close();
                                            //Ext.getCmp(prototype.idGr+ '-btnSearch').fireEvent('click', {});
                                        }
                                    });
                                }
                            }
                        });
                    }
                }
            });
        }
    },
    onClickBtnTxt: function(obj, e) {
        Ext.Msg.show({
            title: '.:PRAXISAM:.',
            msg: 'Download Txt File ?',
            buttons: Ext.MessageBox.OKCANCEL,
            scope: this,
            icon: Ext.MessageBox.QUESTION,
            modal: true,
            fn: function(btn) {
                if (btn === 'ok') {
                    this.exportTxt();
                }
            }
        });
    },
    onRendererColumnAttr: function (value, metaData, record, rowIndex, colIndex, store, view) {
        metaData.tdAttr = 'data-qtip="' + value + '"';
        return value;
    },
    exportTxt: function() {
        global.getFile(this.url + '/getFileTxt?IN_OPCION=' + meDE.paramsDE.IN_OPCION
                + '&IN_AIRLIN=' + meDE.paramsDE.IN_AIRLIN
                + '&IN_GRUPO=' + meDE.paramsDE.IN_GRUPO
                + '&IN_TKT=' + meDE.paramsDE.IN_TKT
                + '&IN_TRANSACTION=' + meDE.paramsDE.IN_TRANSACTION
                + '&IN_IATA=' + meDE.paramsDE.IN_IATA
                );
    }
});