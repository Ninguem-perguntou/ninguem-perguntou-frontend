import { useCategories } from "@/hooks/categories";
import { AppBar, Box, Button, Container, IconButton, Toolbar, Typography } from "@mui/material";
import { useNavigate } from "@tanstack/react-router";
import Icon from "@/assets/img/icon.png";
import { LogIn, Search, Menu } from "lucide-react";
import { useState } from "react";

export const Header = () => {
    const { categoriesData } = useCategories();
    const navigate = useNavigate();
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    
    const handleCategoryClick = (slug: string) => {
        setSelectedCategory(prev => prev === slug ? null : slug);
        setMobileMenuOpen(false);
      };
    
    return (
        <AppBar position="static" color="transparent" elevation={0} sx={{ borderBottom: '1px solid #e0e0e0' }}>
        <Container maxWidth="lg">
          <Toolbar sx={{ 
            justifyContent: "space-between", 
            py: 2,
            px: '0 !important'
          }}>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <img
                onClick={() => navigate({ to: "/" })}
                style={{ 
                  width: "40px", 
                  height: "40px",
                  marginRight: "15px", 
                  cursor: "pointer",
                  borderRadius: '50%',
                  border: '2px solid #000'
                }}
                src={Icon}
                alt="Logo Ninguém Perguntou"
              />
              <Typography 
                variant="h6" 
                component="h1" 
                sx={{ 
                  fontWeight: 'bold',
                  fontSize: '1.5rem',
                  color: '#000'
                }}
              >
                NINGUÉM PERGUNTOU
              </Typography>
            </Box>
            
            <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 2, alignItems: 'center' }}>
              {categoriesData?.data.data.map((category: any) => (
                <Button 
                  key={category.slug}
                  onClick={() => handleCategoryClick(category.slug)}
                  sx={{ 
                    color: selectedCategory === category.slug ? '#ff007a' : '#000',
                    textTransform: 'uppercase',
                    fontSize: '0.75rem',
                    fontWeight: 'bold',
                    letterSpacing: '1px',
                    px: 1,
                    minWidth: 'auto',
                    '&:hover': {
                      color: '#ff007a',
                      backgroundColor: 'transparent'
                    }
                  }}
                >
                  {category.name}
                </Button>
              ))}
              
              <IconButton sx={{ color: '#000' }}>
                <Search className="w-5 h-5" />
              </IconButton>

              <IconButton edge="end" onClick={() => navigate({ to: "/auth/login" })}>
                <LogIn className="w-5 h-5" />
              </IconButton>
            </Box>
            
            <IconButton 
              sx={{ display: { xs: 'flex', md: 'none' }, color: '#000' }}
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              <Menu className="w-6 h-6" />
            </IconButton>
          </Toolbar>
        </Container>
        
        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <Box sx={{ 
            display: { xs: 'block', md: 'none' },
            bgcolor: '#fff',
            px: 2,
            py: 1,
            borderTop: '1px solid #e0e0e0'
          }}>
            {categoriesData?.data.data.map((category: any) => (
              <Button 
                key={`mobile-${category.slug}`}
                fullWidth
                onClick={() => handleCategoryClick(category.slug)}
                sx={{ 
                  color: selectedCategory === category.slug ? '#ff007a' : '#000',
                  textTransform: 'uppercase',
                  fontSize: '0.75rem',
                  fontWeight: 'bold',
                  letterSpacing: '1px',
                  justifyContent: 'flex-start',
                  px: 1,
                  py: 2,
                  '&:hover': {
                    color: '#ff007a',
                    backgroundColor: 'transparent'
                  }
                }}
              >
                {category.name}
              </Button>
            ))}
          </Box>
        )}
      </AppBar>
    )
}