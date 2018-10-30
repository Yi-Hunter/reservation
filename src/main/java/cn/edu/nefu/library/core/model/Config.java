package cn.edu.nefu.library.core.model;

/**
 * @author : pc
 * @date : 2018/10/30
 * @since : Java 8
 */
public class Config {
    /**
     * 配置的表的id
     */
    Integer systemId;
    /**
     * key
     */
    String configKey;
    /**
     * value
     */
    String configValue;

    public Integer getSystemId() {
        return systemId;
    }

    public void setSystemId(Integer systemId) {
        this.systemId = systemId;
    }

    public String getConfigKey() {
        return configKey;
    }

    public void setConfigKey(String configKey) {
        this.configKey = configKey;
    }

    public String getConfigValue() {
        return configValue;
    }

    public void setConfigValue(String configValue) {
        this.configValue = configValue;
    }
}
