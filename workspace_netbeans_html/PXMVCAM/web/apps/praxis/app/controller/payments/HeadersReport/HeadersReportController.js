Ext.define('Ext.Praxis.controller.payments.HeadersReport.HeadersReportController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.HeadersReportController',
    url: CONTEXTPATH + '/HeadersReport',
    procesadores: [],
    request: axios.create({
        baseURL: CONTEXTPATH + '/HeadersReport',
        timeout: 0
    }),
    requestMisc: axios.create({
        baseURL: CONTEXTPATH + '/MiscellaneousCatalog',
        timeout: 0
    }),
    filters: [],
    init: function (view) {
        this.hasSearched = false; //  Indicador de si ya se realizó una búsqueda
        this.hasLoadedSequences = false; //  Indicador de si ya se cargó SequencesGrid
    },
    afterRender: async function () {
        const me = this;
        await this.loadFilters();
        this.onChangeView(null,{opcion:'2'});

        // --- Cargar HeadersGrid al abrir el componente ---
        me.onClickSearchBtn();
        me.hasLoadedHeaders = true;

        // --- Escuchar cuando se muestre la vista Sequences ---
        const sequenceView = Ext.getCmp(prototype.id + '-viewSecuence');

        // Si las vistas se activan/desactivan con "show"/"hide"
        if (sequenceView) {
            sequenceView.on('show', function () {
                if (!me.hasLoadedSequences) {
                    me.onClickSearchBtn();
                    me.hasLoadedSequences = true;
                }
            });
        }
    },
    loadFilters: async function () {
        const me = this;
        const panelFilter = Ext.getCmp(prototype.id + '-panelFilters');
        panelFilter.setLoading(true);
        try {
            const res = await me.requestMisc.get('loadMdpFilters');
            if (res.status === 200) {
                me.filters = res.data;
                const cmbProc = Ext.getCmp(prototype.id + '-cmbCODPRO');
                global.setComboStore(cmbProc, me.filters.PROCESADORES, 'CODE', 'NAME', '');
            }
        } catch (e) {
            console.error(e);
        } finally {
            panelFilter.setLoading(false);
        }
    },
    onClickSearchBtn: function () {
        const me = this;

        const params = me.formatParams();
        const rb = Ext.getCmp(prototype.id + '-viewOption').getValue().opcion;

        // Si estamos en Headers
        if (rb === '1') {
            const headersContainer = Ext.getCmp(prototype.id + '-HeadersGrid');
            headersContainer.removeAll();
            const grid = Ext.create('Ext.Praxis.view.payments.HeadersReportForm.Grids.HeadersGrid', {
                id: prototype.id + '-HeadersGridCmp',
                searchParams: params,
                filters: me.filters
            });
            headersContainer.add(grid);
        }

        // Si estamos en Sequence
        if (rb === '2') {
            const sequenceContainer = Ext.getCmp(prototype.id + '-SequencesGrid');
            sequenceContainer.removeAll();
            const grid = Ext.create('Ext.Praxis.view.payments.HeadersReportForm.Grids.SequencesGrid', {
                id: prototype.id + '-SequencesGridCmp',
                searchParams: params,
                filters: me.filters
            });
            sequenceContainer.add(grid);
        }

        // Si estamos en Integrador
        if (rb === '3') {
            let params = me.formatParamsIntegrator();
            const integradorContainer = Ext.getCmp(prototype.id + '-contentIntegrator');
            integradorContainer.removeAll();
            const panelDetail = Ext.create('Ext.Praxis.view.payments.HeadersReportForm.Grids.HeaderIntegratorGrid', {
                id: prototype.id + '-HeaderIntegratorGrid-1',
                searchParams: params,
                filters: me.filters
            });
            integradorContainer.add(panelDetail);
        }

    },
    onDisplayFilterBtn: function () {
        const filters = Ext.getCmp(prototype.id + '-panelFilters');
        if (filters.isVisible()) {
            filters.hide();
        } else {
            filters.show();
        }
    },
    onClearOptionsBtn: function () {
        console.log('clear');
        Ext.getCmp(prototype.id + '-formFilters').getForm().reset();
        Ext.getCmp(prototype.id + '-formFiltersIntegrator').getForm().reset();
    },
    formatParams: function () {
        const filters = Ext.getCmp(prototype.id + '-formFilters').getForm();
        return filters.getValues();
    },

    formatParamsIntegrator: function () {
        const filters = Ext.getCmp(prototype.id + '-formFiltersIntegrator').getForm();
        return filters.getValues();
    },
    onProcessClick: function () {
        const win = Ext.create('Ext.Praxis.view.payments.HeadersReportForm.DataEntrys.DownloadHeadersDataEntry', {
            id: prototype.id + '-DownloadHeadersDataEntry-1'
        });
        win.show();
    },

    onChangeView: function (field, newValue) {
        const cmbStatus = Ext.getCmp(prototype.id + '-formFilters')
                ?.down('combobox[name=IN_STSAP]');

        const storeStatusHeaders = [
            ['', 'All'],
            ['5', 'SFTP'],
            ['L', 'Loaded'],
            ['R', 'Rejected'],
            ['J', 'Justified'],
            ['6', 'Partially Rejected'],
            ['9', 'Partially Justified']
        ];

        const storeStatusSequences = [
            ['', 'All'],
            ['1', 'SFTP'],
            ['2', 'Loaded'],
            ['3', 'Rejected'],
            ['4', 'Partial Rejected'],
            ['5', 'Partial Loaded']
        ];

        if (newValue.opcion === '1') {
            Ext.getCmp(prototype.id + '-viewHeaders').show();
            Ext.getCmp(prototype.id + '-viewSecuence').hide();
            Ext.getCmp(prototype.id + '-contentIntegrator').hide();
            Ext.getCmp(prototype.id + '-dayPilotCmp').hide();
            Ext.getCmp(prototype.id + '-panelFilters').show();
            Ext.getCmp(prototype.id + '-filterIntegrator').hide();
            if (cmbStatus) {
                cmbStatus.getStore().loadData(storeStatusHeaders);
                cmbStatus.setValue('');
            }
        } else if (newValue.opcion === '2') {
            Ext.getCmp(prototype.id + '-viewHeaders').hide();
            Ext.getCmp(prototype.id + '-viewSecuence').show();
            Ext.getCmp(prototype.id + '-contentIntegrator').hide();
            Ext.getCmp(prototype.id + '-dayPilotCmp').hide();
            Ext.getCmp(prototype.id + '-panelFilters').show();
            Ext.getCmp(prototype.id + '-filterIntegrator').hide();
            if (cmbStatus) {
                cmbStatus.getStore().loadData(storeStatusSequences);
                cmbStatus.setValue('');
            }
        } else if (newValue.opcion === '3') {
            Ext.getCmp(prototype.id + '-viewHeaders').hide();
            Ext.getCmp(prototype.id + '-viewSecuence').hide();
            Ext.getCmp(prototype.id + '-contentIntegrator').show();
            Ext.getCmp(prototype.id + '-dayPilotCmp').hide();
            Ext.getCmp(prototype.id + '-panelFilters').hide();
            Ext.getCmp(prototype.id + '-filterIntegrator').show();
        } else if (newValue.opcion === '4') {
            Ext.getCmp(prototype.id + '-viewHeaders').hide();
            Ext.getCmp(prototype.id + '-viewSecuence').hide();
            Ext.getCmp(prototype.id + '-contentIntegrator').hide();
            Ext.getCmp(prototype.id + '-dayPilotCmp').show();
            Ext.getCmp(prototype.id + '-panelFilters').hide();
            Ext.getCmp(prototype.id + '-filterIntegrator').hide();
        }
        this.onClickSearchBtn();
    },

    onChangeDateSTBtn: function (obj) {
        let option = obj.id.split('-').at(-1);

        const from = Ext.getCmp(prototype.id + '-datefieldFromST');
        const to = Ext.getCmp(prototype.id + '-datefieldToST');

        const from2 = Ext.getCmp(prototype.id + '-datefieldFromST2');
        const to2 = Ext.getCmp(prototype.id + '-datefieldToST2');
        const opts = {
            'datefieldFromST': () => {
                to.setValue(from.getValue());
            },
            'datefieldToST': () => {
                if (to.getValue() < from.getValue()) {
                    from.setValue(to.getValue());
                }
            }
        };
        opts[option]();
    }
});