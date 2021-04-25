import mock from './mock'

import './data/dashboard/analytics'

mock.onAny().passThrough() // forwards the matched request over network
