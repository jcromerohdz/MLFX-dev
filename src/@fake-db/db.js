import mock from './mock'

import './data/dashboard/analytics'
import './data/pages/pricing-data'

mock.onAny().passThrough() // forwards the matched request over network
