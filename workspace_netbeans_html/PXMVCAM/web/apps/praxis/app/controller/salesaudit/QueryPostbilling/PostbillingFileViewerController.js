/*
 * Desarrollado por: Zenobio Perez
 * -------------------------------
 * Ext.Praxis.controller.salesaudit.DisputeGestionBsplink.DetailDisputeGestionBsplinkController
 */
Ext.define('Ext.Praxis.controller.salesaudit.QueryPostbilling.PostbillingFileViewerController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.PostbillingFileViewerController',

    beanTMP: {},
    urlWin01: '',
    urlWin02: '',

    IN_DATE: '',
    IN_COUNTRY: '',
    IN_DOCUMENT: '',

    init: function (view) {
        var me = this;
    },

    /**
     * Se ejecuta luego de haber cargado todos los componentes
     */
    afterRender: function () {
    },

    OnBeforeShow: function () {
        // prototype.id = 'BsplinkFileViewer';
        // prototype.url = CONTEXTPATH + '/BsplinkRefundQueryRFND';
    },
    getFilesDirectory: function (data, nmemo,country,urlWin01) {
        var me = this;
        this.IN_DATE = data.A3537FREGI;
        this.IN_COUNTRY = country;
        this.IN_DOCUMENT = nmemo;  
        this.urlWin01 = urlWin01;
        me.beanTMP.IN_DOCUMENT= nmemo;
        me.beanTMP.IN_OPTION = 1;
        me.beanTMP.IN_PATH = "";
        me.beanTMP.IN_DATE = this.IN_DATE;
        me.beanTMP.IN_COUNTRY = this.IN_COUNTRY;
        //,
        
        me.beanTMP.IN_MODULO = 'POSTBILLING';
        if (data.A3537TYPE === 'AM') {
            me.beanTMP.IN_TYPE = 'WEB';
        } else {
            me.beanTMP.IN_TYPE = 'ROBOT';            
        }
        me.getBuscarFilesDirectory(me.beanTMP);
    },
    getFilesDirectory2: function (data, nmemo,country,urlWin01) {
        var me = this;
        this.IN_DATE = data.A2553FREGI;
        this.IN_COUNTRY = country;
        this.IN_DOCUMENT = nmemo;  
        this.urlWin01 = urlWin01;
        me.beanTMP.IN_DOCUMENT= nmemo;
        me.beanTMP.IN_OPTION = 1;
        me.beanTMP.IN_PATH = "";
        me.beanTMP.IN_DATE = this.IN_DATE;
        me.beanTMP.IN_COUNTRY = this.IN_COUNTRY;        
        if (data.A3537TYPE === 'AM') {
            me.beanTMP.IN_TYPE = 'WEB';
            if (data.ESTADO === 'Disputed Rejected' || data.ESTADO === 'Disputed Accepted') {
                me.beanTMP.IN_MODULO = 'DISPUTAS';
            }else{
                me.beanTMP.IN_MODULO = 'ADM';
            }
        } else {
            me.beanTMP.IN_TYPE = 'ROBOT';  
            me.beanTMP.IN_MODULO = 'DISPUTAS';
        }
        me.getBuscarFilesDirectory(me.beanTMP);
    },
    getBuscarFilesDirectory: function () {
         var me = this;
        // 
        var panel = Ext.getCmp(prototype.id03 + '-panel-tree');
        panel.removeAll();

        // Ext.getCmp('DisputeFileViewer').mask('Please Wait....');
        Ext.Ajax.request({
            url: me.urlWin01 + '/GetFilesDirectory',
            method: 'POST',
            timeout: '300000',
            params: me.beanTMP,
            success: function (response, options) {
                //   Ext.getCmp('DisputeFileViewer').unmask();
                var res = Ext.JSON.decode(response.responseText);
                var data = Ext.JSON.decode(res.data);
                //console.log(data);

                var dataRoot = {text: me.beanTMP.IN_DOCUMENT, filename: '', expanded: true, flag: false, children: []};

                Ext.Object.each(data, function (index, value) {
                    dataRoot.children.push({
                        leaf: true,
                        text: value.filename,
                        filename: value.filename,
                        flag: true
                    });
                });

                var tree = Ext.create('Ext.tree.Panel', {
                    id: prototype.id03 + '-tree-directory',
                    rootVisible: true,
                    root: dataRoot,
                    border: false,
                    useArrows: true,
                    multiSelect: true,
                    scope: this,
                    columns: [
                        {
                            xtype: 'treecolumn',
                            text: '',
                            dataIndex: 'text',
                            flex: 1
                        },
                        {
                            sortable: false,
                            xtype: 'actioncolumn',
                            width: 50,
                            align: 'center',
                            items: [
                                {
                                    iconCls: 'fas fa-file-download',
                                    tooltip: 'Download',
                                    handler: 'OnDownloadFile',
                                    isActionDisabled: 'OnDownloadActionDisabled'
                                }
                            ]
                        }
                    ],
                    listeners: {
                        cellclick: 'OnTreeItemClick'
                    },
                    viewConfig: {
                        stripeRows: true,
                        enableTextSelection: true,
                        markDirty: true,
                        getRowClass: function (record, rowIndex, rowParams, store) {
                            if (rowIndex % 2 == 0)
                                return 'rowA';
                        }
                    }
                });
                panel.add(tree);
                panel.updateLayout();
            }
        });
    },

    OnTreeItemClick: function (obj, td, cellIndex, record, tr, rowIndex, e, eOpts) {
        if (cellIndex == 0) {

            if (record.get('filename') !== '') {
                var extensionFile = Ext.util.Format.lowercase(record.get('filename').split('.').pop());
                var panel = Ext.getCmp(prototype.id03 + '-panel-viewer');
                panel.removeAll();
                if (extensionFile === 'jpg' || extensionFile === 'png' || extensionFile === 'jpge') {
                    panel.update('<div id="' + prototype.id03 + '-imageViewerContainer" style="width: 768px; height: 575px;" ></div>');

                    // /resources Postbilling
                    var curect_file_path = CONTEXTPATH + "/IMGTMPDISPUTE/" + this.IN_DATE + "/" + this.IN_COUNTRY + "/" + this.IN_DOCUMENT + "/" + record.get('filename');
                    //console.log(curect_file_path);
                    $("#" + prototype.id03 + "-imageViewerContainer").verySimpleImageViewer({
                        imageSource: curect_file_path,
                        frame: ['100%', '100%'],
                        maxZoom: '900%',
                        zoomFactor: '10%',
                        mouse: true,
                        keyboard: true,
                        toolbar: true,
                        rotateToolbar: true
                    });
                } else if (extensionFile === 'pdf') {
                    // /resources
                    var curect_file_path = CONTEXTPATH + "/IMGTMPDISPUTE/" + this.IN_DATE + "/" + this.IN_COUNTRY + "/" + this.IN_DOCUMENT + "/" + record.get('filename');
                    //console.log(curect_file_path);
                    var htmlPdf = '<object data="' + curect_file_path + '" style="width: 768px; height: 575px;" type="application/pdf">' +
                            '<embed src="' + curect_file_path + '"  style="width: 768px; height: 575px;" type="application/pdf" />' +
                            '</object>';
                    panel.update(htmlPdf);
                } else {
                    panel.update('<div id="' + prototype.id + '-imageViewerContainer" style="width: 768px; height: 575px; display: flex; justify-content:center; align-items: center;" ><span style="font-size: 24px;">Preview not available.</span></div>');
                }
            }
        }
    },

    OnDownloadFile: function (grid, rowIndex, colIndex) {
        //console.log(rowIndex);
        var record = grid.getStore().getAt(rowIndex);
        // /resources
        window.open(CONTEXTPATH + "/IMGTMPDISPUTE/" + this.IN_DATE + "/" + this.IN_COUNTRY + "/" + this.IN_DOCUMENT + "/" + record.get('filename'), '_blank');
    },

    OnDownloadActionDisabled: function (view, rowIndex, colIndex, item, record) {
        return !record.get('flag') ? true : false;
    },
    onCloseClick: function (btn) {
        this.view.close();
    },
});